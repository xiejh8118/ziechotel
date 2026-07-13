---
name: cambodia-tax-guide
description: "Cambodia tax law, fiscal policy, and tax planning assistant. This skill should be used when the user asks about Cambodia tax types (Profit Tax, VAT, Withholding Tax, Salary Tax, Patent Tax, etc.), tax rates and thresholds, tax filing deadlines and compliance, Qualified Investment Project (QIP) incentives, Special Economic Zone (SEZ) benefits, Double Taxation Agreements (DTA), capital gains tax, tax planning strategies for Cambodia, or needs to search the latest tax law updates from the General Department of Taxation (GDT) and Ministry of Economy and Finance (MEF) websites. Triggers include: Cambodia tax,柬埔寨税法,柬埔寨税务,Cambodia tax planning,GDT Cambodia,QIP incentives,Cambodia VAT,Cambodia fiscal policy."
---

# Cambodia Tax Guide

## Overview

This skill provides comprehensive guidance on Cambodia's tax system, including tax types, rates, filing requirements, investment incentives, double taxation agreements, and tax planning strategies. It enables searching the latest tax law updates from Cambodia's General Department of Taxation (GDT) and Ministry of Economy and Finance (MEF) official websites.

## Key Information Sources

### Official Tax Authority Websites

| Authority | Website | Language | Content |
|-----------|---------|----------|---------|
| General Department of Taxation (GDT) | https://www.tax.gov.kh/en/ | EN/KH | Tax laws, regulations, notices, instructions, filing deadlines, e-Tax portal |
| GDT e-Tax Portal | https://www.tax.gov.kh/en/e-tax-portal | EN/KH | Online tax filing, registration, payment |
| Ministry of Economy and Finance (MEF) | https://mef.gov.kh/ | EN/KH | Fiscal policy, budget law, Prakas (ministerial orders) |
| Council for the Development of Cambodia (CDC) | https://cdc.gov.kh/ | EN/KH | QIP investment incentives, investment law |
| GDT Tax Bulletin | https://www.tax.gov.kh/en/categories/tax-bulletin | EN/KH | Quarterly tax bulletin publications |
| GDT Laws & Regulations | https://www.tax.gov.kh/en/categories/law | EN/KH | All tax laws and regulations |
| GDT Notifications | https://www.tax.gov.kh/en/notice/page/1 | EN/KH | Latest tax notifications |
| GDT Instructions | https://www.tax.gov.kh/en/categories/ON86y770444897446 | EN/KH | Latest tax instructions |

### Key GDT Online Systems

- **e-Registration**: Taxpayer registration
- **e-Filing**: Monthly and annual tax return filing (https://www.tax.gov.kh/en/e-tax-portal)
- **e-Payment**: Online tax payment
- **GDT Chatbot "BEAURAMEI"**: AI chatbot for tax inquiries (launched Jan 2026)
- **Tax Certificate Management System**: Digital tax certificates

## Workflow: Answering Cambodia Tax Questions

### Step 1: Identify the Query Type

Determine which category the user's question falls into:

1. **Tax Types & Rates** → Load `references/cambodia_tax_system.md`
2. **Tax Incentives & QIP** → Load `references/cambodia_tax_incentives.md`
3. **DTA & Tax Planning** → Load `references/cambodia_dta_tax_planning.md`
4. **Tax Authority & Online Systems** → Load `references/cambodia_tax_authorities.md`
5. **Latest Tax Law Updates** → Run `scripts/fetch_gdt_updates.py` to fetch latest news, or use WebFetch to access GDT website directly

### Step 2: Retrieve Latest Information

For queries about the latest tax law changes, fiscal policies, or new regulations:

1. Run the `scripts/fetch_gdt_updates.py` script to fetch recent GDT notifications and instructions
2. If more detail is needed, use WebFetch to access specific GDT pages:
   - Latest notifications: https://www.tax.gov.kh/en/notice/page/1
   - Latest instructions: https://www.tax.gov.kh/en/categories/ON86y770444897446
   - Tax bulletin: https://www.tax.gov.kh/en/categories/tax-bulletin
3. For MEF fiscal policy updates, use WebFetch on https://mef.gov.kh/
4. For CDC investment incentive updates, use WebFetch on https://cdc.gov.kh/incentives-and-schemes/

### Step 3: Provide Comprehensive Answer

Structure the answer with:
- Direct answer to the question (rates, deadlines, requirements, etc.)
- Relevant legal basis (Law on Taxation article, Prakas number, notification number)
- Practical implications and compliance requirements
- Tax planning considerations if applicable
- Source reference and date of information

## Tax Filing Calendar (Monthly/Annual)

| Tax Type | Filing Deadline | Frequency |
|----------|----------------|-----------|
| VAT (Manual) | 20th of following month | Monthly |
| VAT (e-Filing) | 25th of following month | Monthly |
| Prepayment of Tax on Income | 20th of following month | Monthly |
| Withholding Tax | 20th of following month | Monthly |
| Salary Tax | 20th of following month | Monthly |
| Annual Income Tax Return | March 31 (for calendar year) | Annual |
| Patent Tax Renewal | March 31 | Annual |
| Property Tax | September 30 (extended to Dec 31 for 2025) | Annual |
| Tax on Means of Transportation | June 30 (with reminders) | Annual |

## Quick Reference: Key Tax Rates (2025-2026)

| Tax Type | Rate | Notes |
|----------|------|-------|
| Corporate Income Tax (CIT) | 20% | Standard rate; 30% for oil/gas/mining |
| Minimum Tax | 1% of turnover | Unless QIP or exempt |
| Prepayment of Tax on Income (PTI) | 1% of monthly turnover | Credit against annual CIT |
| VAT (Standard) | 10% | Most goods and services |
| VAT (Exports) | 0% | Zero-rated |
| Salary Tax | 0%-20% progressive | Residents; 20% flat for non-residents |
| Withholding Tax (to residents) | 4%-15% | Various payment types |
| Withholding Tax (to non-residents) | 14% | Standard rate |
| Capital Gains Tax | 20% | Effective from 2026-01-01 for real estate |
| Patent Tax | KHR 400K-5M | Based on taxpayer size |
| Fringe Benefits Tax | 20% | Flat rate |
| Public Lighting Tax | 5% | Alcohol and tobacco |
| Accommodation Tax | 2% | Hotel accommodation |
| Property Tax | 0.1% | Immovable property |
| Unused Land Tax | 2% | Unused land |
| Special Tax | 3%-35% | Goods and services |

## Resources

### references/

- **`cambodia_tax_system.md`** — Complete reference on all Cambodia tax types, rates, thresholds, calculation methods, and filing procedures. Load when answering questions about specific tax types, rates, or compliance.
- **`cambodia_tax_incentives.md`** — Detailed guide on QIP incentives, SEZ benefits, sector-specific tax breaks, and CDC investment application process. Load when answering questions about investment incentives or tax holidays.
- **`cambodia_dta_tax_planning.md`** — Double taxation agreements, treaty rates, tax planning strategies, transfer pricing, and cross-border structuring. Load when answering questions about international tax or tax optimization.
- **`cambodia_tax_authorities.md`** — Tax authority contacts, online systems, registration procedures, audit processes, and penalty structures. Load when answering questions about compliance, registration, or dealing with tax authorities.

### scripts/

- **`fetch_gdt_updates.py`** — Fetches the latest tax notifications, instructions, and news from the GDT website (https://www.tax.gov.kh/en/). Run when the user needs the most recent tax law updates or wants to track Cambodia tax law dynamics.
