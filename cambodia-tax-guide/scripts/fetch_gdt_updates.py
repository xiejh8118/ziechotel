#!/usr/bin/env python3
"""
Fetch latest tax updates from Cambodia GDT (General Department of Taxation) website.

This script fetches the latest notifications, instructions, and news from the GDT website
(https://www.tax.gov.kh/en/) and prints them in a structured format.

Usage:
    python fetch_gdt_updates.py [--category notifications|instructions|all] [--limit 10]

Categories:
    notifications  - Latest GDT notifications (https://www.tax.gov.kh/en/notice/page/1)
    instructions   - Latest GDT instructions (https://www.tax.gov.kh/en/categories/ON86y770444897446)
    all            - Both notifications and instructions (default)

Options:
    --limit N      Number of items to fetch per category (default: 10)
    --output FILE  Save results to file (default: print to stdout)
"""

import argparse
import json
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime
from html.parser import HTMLParser


GDT_URLS = {
    "notifications": "https://www.tax.gov.kh/en/notice/page/1",
    "instructions": "https://www.tax.gov.kh/en/categories/ON86y770444897446",
    "homepage": "https://www.tax.gov.kh/en/",
    "tax_bulletin": "https://www.tax.gov.kh/en/categories/tax-bulletin",
}


class GDTContentParser(HTMLParser):
    """Parse GDT website HTML to extract document listings."""

    def __init__(self):
        super().__init__()
        self.documents = []
        self.current_doc = {}
        self.in_table_row = False
        self.in_cell = False
        self.cell_index = 0
        self.capture_text = False
        self.text_buffer = ""
        self.in_hot_news = False
        self.hot_news_items = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        cls = attrs_dict.get("class", "")

        # Detect table rows in document listings
        if tag == "tr":
            self.in_table_row = True
            self.current_doc = {}
            self.cell_index = 0

        if tag == "td" and self.in_table_row:
            self.in_cell = True
            self.cell_index += 1
            self.text_buffer = ""

        if tag == "a" and self.in_cell:
            href = attrs_dict.get("href", "")
            if href:
                if not href.startswith("http"):
                    href = "https://www.tax.gov.kh" + href
                self.current_doc["link"] = href

        # Detect hot news section
        if "hot-news" in cls.lower() or "hotnews" in cls.lower():
            self.in_hot_news = True

        if tag == "a" and self.in_hot_news:
            href = attrs_dict.get("href", "")
            title = attrs_dict.get("title", "")
            if href and "content-detail" in href:
                if not href.startswith("http"):
                    href = "https://www.tax.gov.kh" + href
                self.hot_news_items.append({"title": title, "link": href})

    def handle_endtag(self, tag):
        if tag == "td" and self.in_cell:
            self.in_cell = False
            text = self.text_buffer.strip()
            if text:
                if self.cell_index == 1:
                    self.current_doc["doc_number"] = text
                elif self.cell_index == 2:
                    self.current_doc["issue_date"] = text
                elif self.cell_index == 3:
                    self.current_doc["title"] = text
                elif self.cell_index == 4:
                    self.current_doc["status"] = text

        if tag == "tr" and self.in_table_row:
            self.in_table_row = False
            if self.current_doc.get("title"):
                self.documents.append(self.current_doc)
            self.current_doc = {}

        if tag == "div" and self.in_hot_news:
            self.in_hot_news = False

    def handle_data(self, data):
        if self.in_cell:
            self.text_buffer += data


def fetch_url(url, timeout=30):
    """Fetch URL content with proper headers."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as e:
        print(f"Error fetching {url}: {e}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"Unexpected error fetching {url}: {e}", file=sys.stderr)
        return None


def extract_dates_from_homepage(html):
    """Extract upcoming tax filing deadlines from GDT homepage."""
    deadlines = []
    # Look for patterns like "July 20, 2026" near "Filing Tax Returns"
    pattern = r"(?:Filing Tax Returns[^<]*?)(\w+ \d+,?\s+\d{4})"
    matches = re.findall(pattern, html, re.IGNORECASE)
    for match in matches:
        deadlines.append(match.strip())
    return deadlines


def parse_notifications(html):
    """Parse notification listing page."""
    parser = GDTContentParser()
    try:
        parser.feed(html)
    except Exception:
        pass
    return parser.documents


def fetch_category(category, limit=10):
    """Fetch documents from a specific GDT category."""
    if category not in GDT_URLS:
        print(f"Unknown category: {category}", file=sys.stderr)
        return []

    url = GDT_URLS[category]
    html = fetch_url(url)
    if not html:
        return []

    documents = parse_notifications(html)
    return documents[:limit]


def fetch_homepage_info():
    """Fetch homepage for upcoming deadlines and hot news."""
    html = fetch_url(GDT_URLS["homepage"])
    if not html:
        return {"upcoming_deadlines": [], "hot_news": []}

    deadlines = extract_dates_from_homepage(html)

    # Extract hot news titles
    hot_news = []
    # Look for news items with dates
    news_pattern = r"(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+\w+\s+\d+,?\s+\d{4}[^<]*"
    news_matches = re.findall(news_pattern, html, re.IGNORECASE)
    for match in news_matches[:10]:
        hot_news.append(match.strip())

    return {
        "upcoming_deadlines": deadlines,
        "hot_news": hot_news,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Fetch latest Cambodia GDT tax updates"
    )
    parser.add_argument(
        "--category",
        choices=["notifications", "instructions", "all"],
        default="all",
        help="Category to fetch (default: all)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=10,
        help="Number of items per category (default: 10)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=None,
        help="Save results to JSON file (default: print to stdout)",
    )
    parser.add_argument(
        "--include-homepage",
        action="store_true",
        help="Also fetch homepage for upcoming deadlines and hot news",
    )

    args = parser.parse_args()

    result = {
        "fetch_time": datetime.utcnow().isoformat() + "Z",
        "source": "General Department of Taxation (GDT) Cambodia",
        "website": "https://www.tax.gov.kh/en/",
        "categories": {},
    }

    categories_to_fetch = (
        ["notifications", "instructions"]
        if args.category == "all"
        else [args.category]
    )

    for category in categories_to_fetch:
        print(f"Fetching {category}...", file=sys.stderr)
        docs = fetch_category(category, args.limit)
        result["categories"][category] = docs
        print(f"  Found {len(docs)} documents", file=sys.stderr)

    if args.include_homepage:
        print("Fetching homepage info...", file=sys.stderr)
        homepage_info = fetch_homepage_info()
        result["homepage"] = homepage_info

    # Output
    output_json = json.dumps(result, indent=2, ensure_ascii=False)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output_json)
        print(f"Results saved to {args.output}", file=sys.stderr)
    else:
        print(output_json)


if __name__ == "__main__":
    main()
