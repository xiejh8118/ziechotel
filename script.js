const toast = document.querySelector(".toast");
const I18N_STORAGE_KEY = "ziec_language";
const I18N_TEXT = {
  en: {
    "ZIEC HOTEL | 中鼎国际酒店": "ZIEC HOTEL | Zhongding International Hotel",
    "中鼎国际酒店": "Zhongding International Hotel",
    "中鼎国际酒店 · 供应链平台":
      "Zhongding International Hotel · Supply Chain Platform",
    "首页": "Home",
    "酒店公寓": "Hotels & Apartments",
    "企业服务": "Corporate",
    "供应链平台": "Supply Chain",
    "联系我们": "Contact",
    "AI客服": "AI Assistant",
    "WhatsApp 咨询": "WhatsApp",
    "WhatsApp咨询": "WhatsApp",
    "中文人工咨询": "Chinese Support",
    "柬埔寨中文酒店旅游服务":
      "Cambodia Hotel & Local Business Services",
    "懂中文 · 懂柬埔寨 · 本地团队协助入住":
      "Chinese-speaking support · Local operation · Reliable stay assistance",
    "服务金边、西港、暹粒｜精选酒店、公寓长租、机场接送、包车与企业团房咨询":
      "Serving Phnom Penh, Sihanoukville and Siem Reap with curated stays, monthly apartments, airport transfers, car service and corporate group accommodation.",
    "查看精选住宿": "View Selected Stays",
    "ZIEC LIFE Cambodia": "ZIEC LIFE Cambodia",
    "接送包车": "Transfers & Cars",
    "柬埔寨本地住宿、出行、企业服务与供应链对接平台":
      "Cambodia accommodation, mobility, business services and supply chain matching platform",
    "酒店公寓、接送包车、企业接待与供应链资源，一站对接中文、本地与企业客户需求。":
      "Hotels, apartments, transfers, corporate reception and supplier resources for Chinese-speaking, local and business customers.",
    "查看服务": "View Services",
    "住｜酒店公寓": "Stay | Hotels & Apartments",
    "行｜接送包车": "Move | Transfers & Cars",
    "商｜企业服务": "Business | Corporate Services",
    "供｜供应链平台": "Supply | Supplier Platform",
    "核心服务": "Core Services",
    "住宿 · 出行 · 企业 · 供应链": "Stay · Move · Business · Supply",
    "在柬埔寨，把住宿、出行和企业资源安排好":
      "Accommodation, mobility and business resources arranged in Cambodia",
    "从短住长租到接送包车、企业接待和采购对接，中鼎本地团队协助确认需求、价格与可用资源。":
      "From short stays and long-term rentals to transfers, corporate reception and procurement matching, ZIEC's local team helps confirm needs, pricing and available resources.",
    "住得安心": "Reliable Stays",
    "酒店客房、月租公寓、长期住宿、企业团房与员工宿舍，按入住周期和预算匹配。":
      "Hotel rooms, monthly apartments, long stays, group accommodation and staff housing matched by duration and budget.",
    "出行省心": "Easy Mobility",
    "机场接送、市内包车、司机服务和本地协助，适合旅游、商务和团队行程。":
      "Airport transfers, city car service, drivers and local support for travel, business and group trips.",
    "企业好安排": "Business Made Easier",
    "团队住宿、会议接待、员工长住、月结方案和长期合作，减少企业落地成本。":
      "Group stays, meeting reception, staff long stays, monthly settlement and long-term cooperation to reduce local coordination costs.",
    "资源对得上": "Matched Resources",
    "建筑材料、工程维修、家具设备、物流和企业服务供应商，支持采购询价与人工匹配。":
      "Building materials, engineering repair, furniture, logistics and business service suppliers with RFQ and manual matching support.",
    "中文客服": "Chinese Support",
    "真实房源": "Verified Rooms",
    "本地履约": "Local Fulfillment",
    "企业协议价": "Corporate Rates",
    "付款退款说明": "Payment & Refund Guide",
    "运营主体": "Operator",
    "中鼎瑞德酒店管理有限公司": "Zhongding Ruide Hotel Management Co., Ltd.",
    "服务城市": "Service Cities",
    "金边 · 西港 · 暹粒": "Phnom Penh · Sihanoukville · Siem Reap",
    "中文服务热线": "Chinese Hotline",
    "服务保障": "Service Assurance",
    "订单 · 付款 · 退款说明 →": "Orders · Payment · Refund Guide →",
    "四类客户，一套本地中文服务":
      "One Local Platform for Four Customer Groups",
    "先解决住宿与落地服务，再连接企业与酒店资源。":
      "Start with stays and local assistance, then connect business and hotel resources.",
    "中国游客": "Chinese Travelers",
    "中文客服、机场接送、包车，以及金边、西港、暹粒行程咨询。":
      "Chinese-speaking support, airport transfers, car service and itinerary help in Phnom Penh, Sihanoukville and Siem Reap.",
    "咨询旅游住宿 →": "Ask About Travel Stays →",
    "华人商务客": "Chinese Business Travelers",
    "出差住宿、发票咨询、会议接待、企业协议价与长期住宿。":
      "Business stays, invoice assistance, meeting reception, corporate rates and long-term accommodation.",
    "查看企业服务 →": "View Corporate Services →",
    "本地华人及企业": "Local Chinese Residents & Companies",
    "员工宿舍、月租酒店、公寓式酒店、团房和月结方案。":
      "Staff housing, monthly hotel stays, serviced apartments, group rooms and monthly settlement options.",
    "查看月租公寓 →": "View Monthly Apartments →",
    "柬埔寨酒店商家": "Cambodia Hotel Partners",
    "连接中国客源、中文页面、客服协助、摄影翻译与代运营咨询。":
      "Connect with Chinese guests through Chinese pages, support assistance, photography, translation and operation consulting.",
    "申请酒店合作 →": "Apply for Hotel Partnership →",
    "住宿之外，把落地行程一起安排好":
      "Beyond the Room, We Help Arrange the Local Trip",
    "接送、包车、导游及行程服务由中文客服先确认需求、价格与实际可用情况。":
      "Transfers, car service, guides and itinerary services are confirmed by support before booking.",
    "机场接送": "Airport Transfer",
    "市内包车": "City Car Service",
    "吴哥窟行程": "Angkor Wat Tours",
    "金边商务接待": "Phnom Penh Business Reception",
    "西港出行": "Sihanoukville Travel",
    "签证咨询": "Visa Guidance",
    "咨询落地服务": "Ask About Local Services",
    "酒店住宿与月租公寓": "Hotel Stays & Monthly Apartments",
    "在线查看房型、订单指南与付款方式 →":
      "View rooms, booking guide and payment options →",
    "柬埔寨供应链服务": "Cambodia Supply Chain Services",
    "查找供应商、发布采购询价 →": "Find suppliers and post RFQs →",
    "酒店房型推荐": "Recommended Rooms",
    "精选酒店房型，点击查看详情并预订。":
      "Selected room types with detail and booking entry points.",
    "正在加载酒店推荐……": "Loading hotel recommendations...",
    "供应商推荐": "Recommended Suppliers",
    "展示已审核的优质供应商。":
      "Showing reviewed and qualified suppliers.",
    "正在加载供应商推荐……": "Loading supplier recommendations...",
    "酒店住宿": "Hotel Stays",
    "舒适客房、安心入住 →": "Comfortable rooms, reliable stays →",
    "月租公寓": "Monthly Apartments",
    "US$260/月起，适合长期居住 →":
      "From US$260/month for long-term stays →",
    "团队接待、长包房、协议合作 →":
      "Group reception, long stays and corporate agreements →",
    "会议中心": "Conference Center",
    "客房与公寓，按需入住": "Rooms and Apartments for Every Stay",
    "客房、公寓与酒店设施集中展示，价格清晰，可直接咨询。":
      "Rooms, apartments and hotel facilities are shown clearly with prices and direct consultation.",
    "标准双床房": "Standard Twin Room",
    "适合同事、朋友及商务团队入住。":
      "Suitable for colleagues, friends and business teams.",
    "查看详情": "View Details",
    "立即预订": "Book Now",
    "分享": "Share",
    "海报": "Poster",
    "VIP房": "VIP Room",
    "空间宽敞，适合重要商务接待。":
      "Spacious room for important business reception.",
    "适合商务人士、长住客户与企业员工。":
      "Suitable for business travelers, long-stay guests and company staff.",
    "/ month 起": "/ month",
    "长住更划算，拎包即可入住。":
      "Better value for long stays, ready to move in.",
    "US$260": "US$260",
    "/ 月起": "/ month",
    "独立客厅与卧室": "Separate Living Room and Bedroom",
    "阳台及简易厨房": "Balcony and Simple Kitchen",
    "适合商务长住": "Designed for Business Long Stays",
    "企业客户可咨询专属方案": "Corporate plans available on request",
    "查看公寓详情": "View Apartment Details",
    "咨询月租价格": "Ask Monthly Rate",
    "酒店设施与贴心服务": "Facilities & Services",
    "游泳池、健身房和24小时前台，为商务与长期住宿提供便利。":
      "Pool, gym and 24-hour front desk support business and long-term stays.",
    "游泳池": "Swimming Pool",
    "开阔泳池空间，适合放松休闲。": "Open pool area for relaxing.",
    "健身房": "Fitness Room",
    "满足日常训练与长期入住需求。":
      "Supports daily workouts and long-stay routines.",
    "前台服务": "Front Desk",
    "24小时接待，提供中文与 English 服务。":
      "24-hour reception with Chinese and English support.",
    "企业服务与长期合作": "Corporate Services & Long-Term Cooperation",
    "面向企业客户提供团队住宿、长期接待、月租公寓及协议合作咨询。":
      "Group accommodation, long-term reception, monthly apartments and corporate cooperation consulting.",
    "根据入住规模和周期提供方案":
      "Plans based on group size and stay duration",
    "团队与长包房": "Group and Long-Term Rooms",
    "适合工程项目、商务团队与驻柬员工":
      "For projects, business teams and staff based in Cambodia",
    "专属对接": "Dedicated Contact",
    "快速沟通需求，减少企业安排成本":
      "Fast coordination that reduces arrangement costs",
    "联系我们获取方案": "Contact Us for a Plan",
    "请告知入住人数、日期与预计周期。":
      "Please share guest count, dates and expected stay period.",
    "WhatsApp 企业咨询": "Corporate WhatsApp",
    "同步支持供应商入驻、采购询价与企业资源对接":
      "Supplier onboarding, procurement inquiries and business resource matching are also supported.",
    "链接柬埔寨优质供应链，服务企业真实需求":
      "Connecting Quality Cambodian Suppliers for Real Business Needs",
    "依托中鼎在柬埔寨长期积累的企业资源与本地服务能力，为工程项目、企业客户和供应商提供可靠、高效的合作对接。":
      "Built on ZIEC's local business resources in Cambodia, the platform supports reliable cooperation among projects, corporate clients and suppliers.",
    "查找供应商": "Find Suppliers",
    "建筑材料、钢结构、工程施工、物流与企业服务 →":
      "Building materials, steel structure, construction, logistics and business services →",
    "供应商入驻": "Supplier Onboarding",
    "提交企业资料，审核通过后正式展示 →":
      "Submit company information and go live after review →",
    "发布采购询价": "Post RFQ",
    "提交采购需求，由平台协助对接供应商 →":
      "Submit purchasing needs and let the platform assist matching →",
    "平台人工对接": "Manual Matching",
    "酒店前台与中鼎团队提供线下联系支持 →":
      "Hotel front desk and ZIEC team provide offline contact support →",
    "建筑材料": "Building Materials",
    "钢结构": "Steel Structure",
    "工程施工": "Construction",
    "防水维修": "Waterproofing & Repair",
    "家具设备": "Furniture & Equipment",
    "物流运输": "Logistics",
    "财税法务": "Tax, Finance & Legal",
    "酒店及企业服务": "Hotel & Business Services",
    "新增供应商": "New Suppliers",
    "企业在线提交，后台审核后上线": "Apply online, publish after admin review",
    "一键分享": "One-Click Share",
    "供应商资料可直接转发给客户":
      "Supplier profiles can be shared directly with clients",
    "海报生成": "Poster Generator",
    "自动生成企业推广海报并保存":
      "Automatically generate and save company promo posters",
    "浏览供应商": "Browse Suppliers",
    "预订前说明清楚，入住更放心":
      "Clear Booking Terms for a Smoother Stay",
    "提交需求后，由中文客服核实房态、最终价格和服务安排，再确认订单。":
      "After your request, support verifies availability, final price and service arrangements before confirming.",
    "真实信息": "Verified Information",
    "房型图片、地址、设施和入住政策以酒店最终确认为准。":
      "Room images, address, facilities and policies are subject to final hotel confirmation.",
    "付款说明": "Payment Guide",
    "支持方式由客服按订单确认；微信、支付宝及银行卡付款请先咨询。":
      "Available payment methods are confirmed per order; ask before using WeChat, Alipay or bank card.",
    "退款规则": "Refund Rules",
    "免费取消期限、不可退订单及退款时间会在付款前明确告知。":
      "Free cancellation windows, non-refundable terms and refund timing are explained before payment.",
    "本地协助": "Local Assistance",
    "入住、接送或行程出现问题，可联系中文客服协助处理。":
      "Contact support if issues arise with check-in, transfers or itinerary services.",
    "预订与咨询": "Booking & Consultation",
    "客房预订、月租公寓和企业合作，欢迎直接联系我们。":
      "Contact us for room bookings, monthly apartments and corporate cooperation.",
    "电话 / KH": "Phone / KH",
    "中文服务": "Chinese Service",
    "中鼎 AI 客服": "ZIEC AI Assistant",
    "酒店住宿 · 企业服务 · 供应链咨询":
      "Hotel stays · Corporate services · Supply chain consulting",
    "您好，我是中鼎 AI 客服。您可以咨询客房、月租公寓、企业住宿、供应商入驻或采购询价。":
      "Hello, I am the ZIEC AI Assistant. You can ask about rooms, monthly apartments, corporate stays, supplier onboarding or RFQs.",
    "客房价格": "Room Rates",
    "采购询价": "RFQ",
    "发送": "Send",
    "转 WhatsApp 人工服务": "Switch to WhatsApp Support",
    "住得舒适，也住得安心": "Comfortable Stays, Reliable Support",
    "商务客房、月租公寓与企业团队住宿，一站查看、咨询与预订。":
      "Business rooms, monthly apartments and corporate group stays in one place.",
    "查询房型": "Check Rooms",
    "查询入住日期与房型": "Check Dates and Room Types",
    "先选择日期和入住人数，再查看下面完整的客房与公寓。":
      "Choose dates and guests first, then review rooms and apartments below.",
    "入住日期": "Check-in Date",
    "退房日期": "Check-out Date",
    "房间数": "Rooms",
    "1间": "1 room",
    "2间": "2 rooms",
    "3间": "3 rooms",
    "4间及以上": "4+ rooms",
    "入住人数": "Guests",
    "1位": "1 guest",
    "2位": "2 guests",
    "3位": "3 guests",
    "4位及以上": "4+ guests",
    "请选择入住和退房日期，酒店将确认实际房态。":
      "Please select check-in and check-out dates; the hotel will confirm availability.",
    "精选客房与长租公寓，清晰展示价格、房型与预订入口。":
      "Selected rooms and long-stay apartments with clear pricing and booking entry points.",
    "查看全部房型 →": "View All Rooms →",
    "商务优选": "Business Pick",
    "双床 · 适合2人 · 免费Wi‑Fi": "Twin beds · For 2 guests · Free Wi-Fi",
    "/晚": "/ night",
    "品质接待": "Premium Reception",
    "宽敞空间 · 商务接待 · 设施齐全":
      "Spacious room · Business reception · Full facilities",
    "长住推荐": "Long-Stay Pick",
    "独立客厅 · 简易厨房 · 拎包入住":
      "Separate living room · Simple kitchen · Ready to move in",
    "/月起": "/ month",
    "企业专属": "Corporate Exclusive",
    "团队与协议住宿": "Group & Contracted Stays",
    "长期住宿、团队接待与企业协议价。":
      "Long stays, group reception and corporate rates.",
    "专属方案": "Dedicated Plan",
    "酒店详情与入住信息": "Hotel Details & Stay Information",
    "预订前先确认地址、房态、入住政策与付款规则，让每一次入住更清楚。":
      "Confirm the address, availability, stay policy and payment rules before booking for a clearer stay.",
    "地址与地图": "Address & Map",
    "柬埔寨 · 金边。具体门牌与地图定位将在订单确认前由中文客服发送。":
      "Phnom Penh, Cambodia. Exact address and map location will be sent before order confirmation.",
    "获取地图定位 →": "Get Map Location →",
    "入住政策": "Stay Policy",
    "入住时间、退房时间、押金、加床及儿童政策以具体房型确认单为准。":
      "Check-in, check-out, deposit, extra bed and child policies depend on the confirmed room type.",
    "确认入住须知 →": "Confirm Stay Notes →",
    "中文评价": "Chinese Reviews",
    "平台将逐步收集已入住客户的真实中文反馈；不展示未经核实的评价。":
      "The platform will gradually collect verified Chinese guest feedback.",
    "咨询住客体验 →": "Ask About Guest Experience →",
    "查看付款说明 →": "View Payment Guide →",
    "付款与退款": "Payment & Refunds",
    "房态确认后再付款；取消期限、不可退条件与退款时间会在付款前说明。":
      "Pay only after availability is confirmed; cancellation terms, non-refundable conditions and refund timing are explained before payment.",
    "立即咨询": "Ask Now",
    "链接柬埔寨优质供应链": "Connecting Quality Suppliers in Cambodia",
    "查找可信供应商、发布采购需求，让企业合作更直接、更高效。":
      "Find trusted suppliers and post purchasing needs for faster cooperation.",
    "采购与企业服务入口": "Purchasing & Business Service Entry",
    "从寻找资源到发布需求，快速进入对应服务。":
      "Move quickly from supplier search to demand submission.",
    "按行业与关键词筛选企业 →": "Filter companies by industry and keyword →",
    "提交4–10张企业及产品图片 →": "Submit 4-10 company or product images →",
    "提交预算、交付时间与采购需求 →":
      "Submit budget, delivery timeline and purchase requirements →",
    "WhatsApp专人协助匹配资源 →":
      "Dedicated WhatsApp support helps match resources →",
    "优先展示平台已审核和推荐的优质企业。":
      "Prioritizing reviewed and recommended companies.",
    "申请入驻 →": "Apply to Join →",
    "供应商资料支持一键分享与推广海报生成":
      "Supplier profiles support quick sharing and promotional posters",
    "企业可在线申请新增，审核通过后自动展示。":
      "Companies can apply online and display after approval.",
    "全部分类": "All Categories",
    "搜索": "Search",
    "正在读取供应商……": "Loading suppliers...",
    "您的企业也可以加入": "Your Company Can Join Too",
    "提交后进入待审核状态，平台审核通过后才会在前台公开展示。":
      "Submissions enter review first and appear publicly only after approval.",
    "申请供应商入驻": "Apply as Supplier",
    "标准双床房 | ZIEC HOTEL": "Standard Twin Room | ZIEC HOTEL",
    "ZIEC HOTEL · 中鼎国际酒店":
      "ZIEC HOTEL · Zhongding International Hotel",
    "房型实景": "Real Room Photos",
    "真实双床房照片，适合同事、朋友及商务团队入住。":
      "Real twin room photos, suitable for colleagues, friends and business teams.",
    "双床配置": "Twin Beds",
    "空调与电视": "Air Conditioning and TV",
    "免费 Wi-Fi": "Free Wi-Fi",
    "适合个人或团队入住": "For Individual or Team Stays",
    "系统分享": "System Share",
    "复制链接": "Copy Link",
    "下载专属海报": "Download Poster",
    "VIP房 | ZIEC HOTEL": "VIP Room | ZIEC HOTEL",
    "真实 VIP 客房照片，空间宽敞，适合重要商务接待与品质住宿。":
      "Real VIP room photos with spacious comfort for business reception and quality stays.",
    "宽敞客房": "Spacious Room",
    "高品质床品": "Quality Bedding",
    "商务接待优选": "Preferred for Business Reception",
    "供应商入驻申请": "Supplier Application",
    "供应商平台 | ZIEC": "Supplier Platform | ZIEC",
    "供应商入驻 | ZIEC": "Supplier Application | ZIEC",
    "填写真实企业资料。审核通过后，企业信息将在供应链平台公开展示。":
      "Submit real company information. After review, the profile will be shown on the supply chain platform.",
    "提交企业资料": "Submit Company Information",
    "带 * 为必填项。电话或 WhatsApp 至少填写一项。":
      "Fields with * are required. Phone or WhatsApp must include at least one.",
    "前台仅展示审核通过的供应商": "Only approved suppliers are displayed",
    "支持平台推荐标识": "Platform recommendation badge supported",
    "客户可直接 WhatsApp 联系": "Clients can contact directly on WhatsApp",
    "资料可由后台暂停或驳回": "Profiles can be paused or rejected by admin",
    "企业名称 *": "Company Name *",
    "供应商分类 *": "Supplier Category *",
    "请选择": "Please Select",
    "所在城市": "City",
    "联系人 *": "Contact Person *",
    "联系电话": "Phone",
    "企业地址": "Company Address",
    "企业 Logo 图片网址（选填）": "Company Logo URL (optional)",
    "企业宣传语（选填）": "Company Slogan (optional)",
    "企业/产品图片 *（4–10张）": "Company/Product Images * (4-10)",
    "请选择清晰的企业、产品、案例或办公环境照片；系统会自动压缩后上传。":
      "Please select clear company, product, case or office photos; the system will compress and upload them.",
    "主营产品或服务 *": "Main Products or Services *",
    "企业简介": "Company Profile",
    "提交入驻申请": "Submit Application",
    "订单与付款指南": "Order & Payment Guide",
    "酒店住宿与预订｜ZIEC HOTEL 中鼎国际酒店":
      "Hotel Stays & Booking | ZIEC HOTEL",
    "在线订单与付款指南｜ZIEC HOTEL": "Online Order & Payment Guide | ZIEC HOTEL",
    "在线订单与付款指南": "Online Order & Payment Guide",
    "先确认订单，再核对官方收款信息，付款后由酒店人工确认。":
      "Confirm the order first, verify official payment information, then wait for manual hotel confirmation.",
    "先提交预订需求，由酒店确认房态、总价和官方收款信息后再付款。":
      "Submit your booking request first. Pay only after the hotel confirms availability, total price and official payment details.",
    "当前预订信息": "Current Booking Information",
    "请选择房型": "Please Select a Room",
    "房型、日期和人数将在这里显示。":
      "Room type, dates and guests will be shown here.",
    "WhatsApp 核对订单": "Verify Order on WhatsApp",
    "酒店房型": "Room Type",
    "提交预订需求": "Submit Booking Request",
    "预订付款步骤": "Booking and Payment Steps",
    "提交住宿需求": "Submit Stay Requirements",
    "填写联系人，并核对入住日期、房型、房间数和入住人数。":
      "Enter your contact details and verify dates, room type, room count and guests.",
    "告知入住日期、离店日期、房型、房间数和联系人。":
      "Share check-in date, check-out date, room type, room count and contact person.",
    "酒店确认订单": "Hotel Confirms Order",
    "前台确认房态、价格、取消政策并发送订单编号。":
      "Front desk confirms availability, price, cancellation policy and order number.",
    "前台确认房态、总价、取消政策，并发送订单编号。":
      "Front desk confirms availability, total price, cancellation policy and order number.",
    "选择付款方式": "Choose Payment Method",
    "核对官方收款信息": "Verify Official Payment Details",
    "付款前确认订单编号、金额、币种和收款方名称。":
      "Confirm order number, amount, currency and payee name before paying.",
    "扫码付款、Visa/Mastercard银行卡，或与前台约定的其他方式。":
      "Pay by QR code, Visa/Mastercard, or other methods agreed with the front desk.",
    "等待到账确认": "Wait for Payment Confirmation",
    "付款后人工确认": "Manual Confirmation After Payment",
    "发送付款截图，最终以酒店确认到账为准。":
      "Send the payment screenshot. Final status depends on hotel confirmation.",
    "付款成功页面或截图仅用于核对，最终以酒店确认到账为准。":
      "Successful payment pages or screenshots are for checking only; final status depends on hotel confirmation.",
    "付款方式": "Payment Methods",
    "联系人 *": "Contact Person *",
    "电话 / WhatsApp *": "Phone / WhatsApp *",
    "备注": "Notes",
    "提交到 WhatsApp 确认": "Submit to WhatsApp",
    "网站不直接收取房费。请先通过官方 WhatsApp 确认订单，再按酒店发送的官方收款信息付款。":
      "The website does not collect room fees directly. Please confirm the order via official WhatsApp first, then pay using the official payment details sent by the hotel.",
    "扫码付款": "QR Code Payment",
    "请先与酒店确认订单编号、金额和币种，再选择对应二维码付款。":
      "Confirm the order number, amount and currency with the hotel before choosing the matching QR code.",
    "美元付款": "USD Payment",
    "USD · 请核对美元金额": "USD · Verify the USD amount",
    "瑞尔付款": "KHR Payment",
    "KHR · 请核对瑞尔金额": "KHR · Verify the KHR amount",
    "付款后请把付款截图发送给酒店客服，最终以酒店确认到账为准。":
      "After payment, send the screenshot to hotel support. Final status depends on hotel confirmation.",
    "扫码核对官方信息": "Scan to Verify Official Info",
    "扫码后请核对网站域名与官方联系方式":
      "After scanning, verify the website domain and official contact details.",
    "涉及具体金额和收款二维码时，请以酒店人工确认结果为准。":
      "For exact amounts and payment QR codes, follow the hotel's manual confirmation.",
    "请后台上传并核验酒店官方收款二维码后启用":
      "Enable after uploading and verifying the official hotel payment QR code in admin.",
    "付款前请确认收款方名称与酒店通知一致。":
      "Before paying, make sure the payee name matches the hotel notice.",
    "是否支持线上刷卡或到店刷卡，以酒店前台确认结果为准。网站不收集或保存银行卡号、有效期及安全码。":
      "Online or on-site card payment depends on front desk confirmation. The website does not collect or store card numbers, expiry dates or security codes.",
    "WhatsApp核对订单与付款": "Verify Order and Payment on WhatsApp",
    "安全提醒": "Safety Reminder",
    "不要向非官方联系人付款；不要在聊天或网页表单中发送完整银行卡资料、密码或验证码。付款前务必核对订单编号、金额、币种和收款方名称。":
      "Do not pay unofficial contacts or send full card details, passwords or verification codes in chat or forms. Always verify order number, amount, currency and payee name before payment.",
    "官方付款信息请以酒店确认结果为准":
      "Official payment information is subject to hotel confirmation.",
    "ZIEC AI客服": "ZIEC AI Assistant",
    "订单与付款咨询": "Order & Payment Help",
    "您好，我可以说明订单流程和付款注意事项。涉及具体金额与二维码时，请与酒店人工核对。":
      "Hello, I can explain order flow and payment notes. For exact amounts and QR codes, please verify with hotel staff.",
    "付款步骤": "Payment Steps",
    "核验二维码": "Verify QR Code",
    "Visa付款": "Visa Payment",
    "客服": "Support"
  },
  kh: {
    "ZIEC HOTEL | 中鼎国际酒店": "ZIEC HOTEL | សណ្ឋាគារអន្តរជាតិ Zhongding",
    "中鼎国际酒店": "សណ្ឋាគារអន្តរជាតិ Zhongding",
    "首页": "ទំព័រដើម", "酒店公寓": "សណ្ឋាគារ និងអាផាតមិន", "企业服务": "សេវាកម្មសហគ្រាស",
    "供应链平台": "វេទិកាផ្គត់ផ្គង់", "联系我们": "ទាក់ទងយើង", "AI客服": "ជំនួយការ AI",
    "柬埔寨中文酒店旅游服务": "សេវាសណ្ឋាគារ និងទេសចរណ៍នៅកម្ពុជា",
    "懂中文 · 懂柬埔寨 · 本地团队协助入住": "ក្រុមការងារក្នុងស្រុក ជួយរៀបចំការស្នាក់នៅនៅកម្ពុជា",
    "查看精选住宿": "មើលកន្លែងស្នាក់នៅដែលបានជ្រើសរើស",
    "核心服务": "សេវាកម្មសំខាន់ៗ",
    "住宿 · 出行 · 企业 · 供应链": "ការស្នាក់នៅ · ការធ្វើដំណើរ · អាជីវកម្ម · ខ្សែសង្វាក់ផ្គត់ផ្គង់",
    "在柬埔寨，把住宿、出行和企业资源安排好": "រៀបចំការស្នាក់នៅ ការធ្វើដំណើរ និងធនធានអាជីវកម្មនៅកម្ពុជា",
    "住得安心": "ស្នាក់នៅដោយទំនុកចិត្ត", "出行省心": "ធ្វើដំណើរដោយងាយស្រួល",
    "企业好安排": "ងាយស្រួលសម្រាប់សហគ្រាស", "资源对得上": "ភ្ជាប់ធនធានត្រឹមត្រូវ",
    "中文客服": "សេវាភាសាចិន", "真实房源": "បន្ទប់ពិតប្រាកដ", "本地履约": "សេវាកម្មក្នុងស្រុក", "企业协议价": "តម្លៃកិច្ចសន្យាសហគ្រាស",
    "四类客户，一套本地中文服务": "សេវាកម្មក្នុងស្រុកសម្រាប់អតិថិជនបួនប្រភេទ",
    "中国游客": "ភ្ញៀវទេសចរចិន", "华人商务客": "អ្នកដំណើរអាជីវកម្មចិន",
    "本地华人及企业": "ជនជាតិចិនក្នុងស្រុក និងសហគ្រាស", "柬埔寨酒店商家": "ដៃគូសណ្ឋាគារកម្ពុជា",
    "住宿之外，把落地行程一起安排好": "មិនត្រឹមតែកន្លែងស្នាក់នៅទេ យើងក៏ជួយរៀបចំដំណើររបស់អ្នកផងដែរ",
    "机场接送": "ទទួលនិងជូនអាកាសយានដ្ឋាន", "市内包车": "ជួលរថយន្តក្នុងក្រុង",
    "吴哥窟行程": "ដំណើរកម្សាន្តអង្គរវត្ត", "金边商务接待": "ទទួលភ្ញៀវអាជីវកម្មនៅភ្នំពេញ",
    "西港出行": "ការធ្វើដំណើរនៅព្រះសីហនុ", "签证咨询": "ប្រឹក្សាទិដ្ឋាការ",
    "酒店住宿与月租公寓": "សណ្ឋាគារ និងអាផាតមិនប្រចាំខែ",
    "柬埔寨供应链服务": "សេវាខ្សែសង្វាក់ផ្គត់ផ្គង់កម្ពុជា",
    "酒店住宿": "ការស្នាក់នៅសណ្ឋាគារ", "月租公寓": "អាផាតមិនប្រចាំខែ", "会议中心": "មជ្ឈមណ្ឌលប្រជុំ",
    "舒适客房、安心入住 →": "បន្ទប់មានផាសុកភាព និងសុវត្ថិភាព →",
    "团队接待、长包房、协议合作 →": "ការស្នាក់នៅជាក្រុម រយៈពេលវែង និងកិច្ចសហការ →",
    "Coming Soon": "នឹងមកដល់ឆាប់ៗនេះ",
    "提交入住需求": "ដាក់សំណើស្នាក់នៅ", "姓名": "ឈ្មោះ", "国家 / 地区": "ប្រទេស / តំបន់",
    "联系电话": "លេខទូរស័ព្ទ", "入住日期": "ថ្ងៃចូលស្នាក់", "退房日期": "ថ្ងៃចាកចេញ",
    "房型": "ប្រភេទបន្ទប់", "房间数": "ចំនួនបន្ទប់", "入住人数": "ចំនួនភ្ញៀវ",
    "入住类型": "ប្រភេទការស្នាក់នៅ", "接送需求": "តម្រូវការដឹកជញ្ជូន", "备注": "កំណត់សម្គាល់",
    "选择咨询方式": "ជ្រើសរើសវិធីទំនាក់ទំនង", "查看服务": "មើលសេវាកម្ម", "酒店房型推荐": "បន្ទប់ដែលណែនាំ", "供应商推荐": "អ្នកផ្គត់ផ្គង់ដែលណែនាំ",
    "查看详情": "មើលព័ត៌មានលម្អិត", "立即预订": "កក់ឥឡូវ", "联系我们获取方案": "ទាក់ទងយើងសម្រាប់ដំណោះស្រាយ",
    "微信": "WeChat", "客房价格": "តម្លៃបន្ទប់", "发送": "ផ្ញើ", "转 WhatsApp 人工服务": "ទាក់ទងតាម WhatsApp"
  }
};
// V6.6 KH completion: cover the public pages, forms, buttons and service copy.
// Exact Khmer is preferred; the English dictionary is used only as a final
// safety net so KH mode never falls back to Chinese text.
Object.assign(I18N_TEXT.kh, {
  "首页": "ទំព័រដើម", "酒店公寓": "សណ្ឋាគារ និងអាផាតមិន", "酒店住宿": "ការស្នាក់នៅសណ្ឋាគារ", "企业服务": "សេវាសហគ្រាស", "供应链平台": "វេទិកាផ្គត់ផ្គង់", "联系我们": "ទាក់ទងយើង", "AI客服": "ជំនួយការ AI",
  "中鼎国际酒店": "សណ្ឋាគារអន្តរជាតិ Zhongding", "中鼎瑞德酒店管理有限公司": "ក្រុមហ៊ុនគ្រប់គ្រងសណ្ឋាគារ Zhongding Ruide", "运营主体": "អង្គភាពប្រតិបត្តិការ", "核心服务": "សេវាសំខាន់", "服务城市": "ទីក្រុងសេវាកម្ម", "服务保障": "ការធានាសេវា",
  "住得安心": "ស្នាក់នៅដោយទំនុកចិត្ត", "出行省心": "ធ្វើដំណើរដោយងាយស្រួល", "企业好安排": "ការរៀបចំងាយស្រួលសម្រាប់សហគ្រាស", "资源对得上": "ភ្ជាប់ធនធានត្រឹមត្រូវ", "查看企业服务 →": "មើលសេវាសហគ្រាស →",
  "供应商平台 | ZIEC": "វេទិកាអ្នកផ្គត់ផ្គង់ | ZIEC", "供应商入驻 | ZIEC": "ចុះឈ្មោះអ្នកផ្គត់ផ្គង់ | ZIEC", "供应商入驻申请": "ពាក្យស្នើចុះឈ្មោះអ្នកផ្គត់ផ្គង់", "提交企业资料": "ដាក់ស្នើព័ត៌មានក្រុមហ៊ុន",
  "房型实景": "រូបភាពបន្ទប់ពិត", "系统分享": "ចែករំលែកតាមប្រព័ន្ធ", "复制链接": "ចម្លងតំណ", "下载专属海报": "ទាញយកផ្ទាំងផ្សព្វផ្សាយ", "立即咨询": "សាកសួរឥឡូវ", "查看全部房型 →": "មើលបន្ទប់ទាំងអស់ →",
  "/ night": "/ យប់", "/ month 起": "/ ខែឡើងទៅ", "/ 月起": "/ ខែឡើងទៅ", "US$35 / night": "US$35 / យប់", "US$60 / night": "US$60 / យប់", "US$70 / night": "US$70 / យប់",
  "4间及以上": "4 បន្ទប់ឡើងទៅ", "4位及以上": "4 នាក់ឡើងទៅ", "请选择": "សូមជ្រើសរើស", "待补充": "រង់ចាំបំពេញ", "平台客服": "សេវាកម្មវេទិកា",
  "在线订单与付款指南": "ការណែនាំការកក់ និងបង់ប្រាក់តាមអ៊ីនធឺណិត", "当前预订信息": "ព័ត៌មានកក់បច្ចុប្បន្ន", "请选择房型": "សូមជ្រើសរើសប្រភេទបន្ទប់", "预订付款步骤": "ជំហានកក់ និងបង់ប្រាក់", "核对官方收款信息": "ផ្ទៀងផ្ទាត់ព័ត៌មានទទួលប្រាក់ផ្លូវការ", "付款后人工确认": "ការបញ្ជាក់ដោយបុគ្គលិកបន្ទាប់ពីបង់ប្រាក់", "扫码付款": "ស្កេនដើម្បីបង់ប្រាក់", "美元付款": "បង់ជាដុល្លារ", "瑞尔付款": "បង់ជារៀល",
  "客房价格": "តម្លៃបន្ទប់", "采购询价": "សំណើតម្លៃទិញ", "客服": "សេវាអតិថិជន", "付款步骤": "ជំហានបង់ប្រាក់", "核验二维码": "ផ្ទៀងផ្ទាត់ QR", "Visa付款": "បង់តាម Visa",
  "柬埔寨本地住宿、出行、企业服务与供应链对接平台": "វេទិកាភ្ជាប់ការស្នាក់នៅ ការធ្វើដំណើរ សេវាសហគ្រាស និងខ្សែសង្វាក់ផ្គត់ផ្គង់នៅកម្ពុជា",
  "酒店公寓、接送包车、企业接待与供应链资源，一站对接中文、本地与企业客户需求。": "សណ្ឋាគារ អាផាតមិន សេវាដឹកជញ្ជូន រថយន្តជួល ការទទួលភ្ញៀវសហគ្រាស និងធនធានផ្គត់ផ្គង់ ក្នុងកន្លែងតែមួយ។",
  "住｜酒店公寓": "ស្នាក់｜សណ្ឋាគារ និងអាផាតមិន", "行｜接送包车": "ធ្វើដំណើរ｜ដឹកជញ្ជូន និងជួលរថយន្ត",
  "商｜企业服务": "អាជីវកម្ម｜សេវាសហគ្រាស", "供｜供应链平台": "ផ្គត់ផ្គង់｜វេទិកាខ្សែសង្វាក់ផ្គត់ផ្គង់",
  "从短住长租到接送包车、企业接待和采购对接，中鼎本地团队协助确认需求、价格与可用资源。": "ចាប់ពីការស្នាក់នៅខ្លីនិងវែង រហូតដល់ការដឹកជញ្ជូន ការទទួលក្រុមហ៊ុន និងការទិញ ក្រុមការងារ Zhongding ជួយបញ្ជាក់តម្រូវការ តម្លៃ និងធនធានដែលមាន។",
  "先解决住宿与落地服务，再连接企业与酒店资源。": "ដោះស្រាយការស្នាក់នៅ និងសេវាកម្មក្នុងស្រុកជាមុន បន្ទាប់មកភ្ជាប់ធនធានសហគ្រាស និងសណ្ឋាគារ។",
  "机场接送、市内包车、司机服务和本地协助，适合旅游、商务和团队行程。": "សេវាដឹកជញ្ជូនអាកាសយានដ្ឋាន ជួលរថយន្តក្នុងក្រុង អ្នកបើកបរ និងជំនួយក្នុងស្រុក សម្រាប់ទេសចរណ៍ អាជីវកម្ម និងក្រុម។",
  "司机服务": "សេវាអ្នកបើកបរ", "本地协助": "ជំនួយក្នុងស្រុក", "咨询接送包车": "សាកសួរអំពីការដឹកជញ្ជូន និងជួលរថយន្ត",
  "在线查看房型、订单指南与付款方式 →": "មើលប្រភេទបន្ទប់ ការណែនាំការកក់ និងវិធីបង់ប្រាក់តាមអ៊ីនធឺណិត →",
  "查找供应商、发布采购询价 →": "ស្វែងរកអ្នកផ្គត់ផ្គង់ និងដាក់សំណើតម្លៃទិញ →",
  "30秒了解 ZIEC HOTEL": "ស្គាល់ ZIEC HOTEL ក្នុងរយៈពេល 30 វិនាទី",
  "酒店实景、月租公寓、企业团房与本地服务。": "ទិដ្ឋភាពសណ្ឋាគារពិត អាផាតមិនប្រចាំខែ បន្ទប់ជាក្រុម និងសេវាកម្មក្នុងស្រុក។",
  "关注视频号": "តាមដានឆានែលវីដេអូ", "访问 YouTube": "ចូលមើល YouTube",
  "精选酒店房型，点击查看详情并预订。": "បន្ទប់សណ្ឋាគារដែលបានជ្រើសរើស។ ចុចមើលព័ត៌មាន និងកក់។",
  "标准双床房": "បន្ទប់គ្រែពីរស្តង់ដារ", "VIP房": "បន្ទប់ VIP", "精美三室一厅套房": "ស៊ុយបីបន្ទប់គេង និងបន្ទប់ទទួលភ្ញៀវ",
  "品质接待": "ការទទួលភ្ញៀវគុណភាព", "家庭与多人入住": "សម្រាប់គ្រួសារ និងភ្ញៀវច្រើន", "长租公寓": "អាផាតមិនជួលរយៈពេលវែង",
  "查看与预订 →": "មើល និងកក់ →", "查看详情 →": "មើលព័ត៌មានលម្អិត →", "进入供应链平台 →": "ចូលវេទិកាផ្គត់ផ្គង់ →",
  "展示已审核的优质供应商。": "បង្ហាញអ្នកផ្គត់ផ្គង់គុណភាពដែលបានពិនិត្យ។", "柬埔寨本地供应商对接": "ភ្ជាប់អ្នកផ្គត់ផ្គង់ក្នុងស្រុកកម្ពុជា",
  "建筑材料、工程服务、家具设备与物流资源": "សម្ភារៈសំណង់ សេវាវិស្វកម្ម គ្រឿងសង្ហារឹម ឧបករណ៍ និងដឹកជញ្ជូន",
  "酒店、公寓、长租、企业住宿 →": "សណ្ឋាគារ អាផាតមិន ជួលរយៈពេលវែង និងការស្នាក់នៅសហគ្រាស →",
  "接送、包车、司机、本地协助 →": "ដឹកជញ្ជូន ជួលរថយន្ត អ្នកបើកបរ និងជំនួយក្នុងស្រុក →",
  "会议接待、团队住宿、长期合作 →": "កិច្ចប្រជុំ ការស្នាក់នៅជាក្រុម និងកិច្ចសហការរយៈពេលវែង →",
  "供应商、采购、资源对接 →": "អ្នកផ្គត់ផ្គង់ ការទិញ និងការភ្ជាប់ធនធាន →",
  "客房与公寓，按需入住": "បន្ទប់ និងអាផាតមិន សម្រាប់តម្រូវការផ្សេងៗ",
  "客房、公寓与酒店设施集中展示，价格清晰，可直接咨询。": "បង្ហាញបន្ទប់ អាផាតមិន និងបរិក្ខារសណ្ឋាគារ ជាមួយតម្លៃច្បាស់ និងអាចសាកសួរបាន។",
  "适合同事、朋友及商务团队入住。": "សមស្របសម្រាប់មិត្តរួមការងារ មិត្តភក្តិ និងក្រុមអាជីវកម្ម។",
  "空间宽敞，适合重要商务接待。": "កន្លែងធំទូលាយ សមស្របសម្រាប់ការទទួលភ្ញៀវអាជីវកម្មសំខាន់ៗ។",
  "三间卧室与独立客厅，适合家庭、多人及企业接待。": "បន្ទប់គេងបី និងបន្ទប់ទទួលភ្ញៀវដាច់ដោយឡែក សម្រាប់គ្រួសារ ក្រុម និងសហគ្រាស។",
  "适合商务人士、长住客户与企业员工。": "សមស្របសម្រាប់អ្នកជំនួញ ភ្ញៀវស្នាក់យូរ និងបុគ្គលិកក្រុមហ៊ុន។",
  "分享": "ចែករំលែក", "海报": "ផ្ទាំងផ្សព្វផ្សាយ", "月租公寓": "អាផាតមិនប្រចាំខែ", "查看公寓详情": "មើលព័ត៌មានអាផាតមិន",
  "长住更划算，拎包即可入住。": "ស្នាក់នៅយូរកាន់តែសន្សំ និងអាចចូលនៅបានភ្លាម។", "独立客厅与卧室": "បន្ទប់ទទួលភ្ញៀវ និងបន្ទប់គេងដាច់ដោយឡែក",
  "阳台及简易厨房": "យ៉រ និងផ្ទះបាយតូច", "适合商务长住": "សមស្របសម្រាប់ការស្នាក់នៅអាជីវកម្មរយៈពេលវែង",
  "企业客户可咨询专属方案": "អតិថិជនសហគ្រាសអាចសាកសួរផែនការពិសេស", "咨询月租价格": "សាកសួរតម្លៃប្រចាំខែ",
  "酒店设施与贴心服务": "បរិក្ខារសណ្ឋាគារ និងសេវាយកចិត្តទុកដាក់", "游泳池、健身房和24小时前台，为商务与长期住宿提供便利。": "អាងហែលទឹក កន្លែងហាត់ប្រាណ និងទទួលភ្ញៀវ 24 ម៉ោង ផ្តល់ភាពងាយស្រួលសម្រាប់អាជីវកម្ម និងការស្នាក់នៅយូរ។",
  "游泳池": "អាងហែលទឹក", "健身房": "កន្លែងហាត់ប្រាណ", "前台服务": "សេវាទទួលភ្ញៀវ",
  "开阔泳池空间，适合放松休闲。": "អាងហែលទឹកធំទូលាយ សម្រាប់សម្រាកលំហែ។", "满足日常训练与长期入住需求。": "បំពេញតម្រូវការហាត់ប្រាណប្រចាំថ្ងៃ និងការស្នាក់នៅយូរ។",
  "24小时接待，提供中文与 English 服务。": "ទទួលភ្ញៀវ 24 ម៉ោង និងផ្តល់សេវាភាសាចិន និងអង់គ្លេស។",
  "企业服务与长期合作": "សេវាសហគ្រាស និងកិច្ចសហការរយៈពេលវែង",
  "面向企业客户提供团队住宿、长期接待、月租公寓及协议合作咨询。": "ផ្តល់ការស្នាក់នៅជាក្រុម ការទទួលរយៈពេលវែង អាផាតមិនប្រចាំខែ និងការប្រឹក្សាកិច្ចសហការសម្រាប់សហគ្រាស។",
  "团队与长包房": "បន្ទប់ជាក្រុម និងជួលរយៈពេលវែង", "专属对接": "ការសម្របសម្រួលពិសេស",
  "根据入住规模和周期提供方案": "ផែនការតាមចំនួនភ្ញៀវ និងរយៈពេលស្នាក់នៅ", "适合工程项目、商务团队与驻柬员工": "សម្រាប់គម្រោងវិស្វកម្ម ក្រុមអាជីវកម្ម និងបុគ្គលិកនៅកម្ពុជា",
  "快速沟通需求，减少企业安排成本": "ទំនាក់ទំនងតម្រូវការយ៉ាងរហ័ស និងកាត់បន្ថយថ្លៃរៀបចំរបស់សហគ្រាស",
  "请告知入住人数、日期与预计周期。": "សូមប្រាប់ចំនួនភ្ញៀវ កាលបរិច្ឆេទ និងរយៈពេលដែលរំពឹងទុក។", "WhatsApp 企业咨询": "សាកសួរសហគ្រាសតាម WhatsApp",
  "链接柬埔寨优质供应链，服务企业真实需求": "ភ្ជាប់ខ្សែសង្វាក់ផ្គត់ផ្គង់គុណភាពនៅកម្ពុជា ដើម្បីបម្រើតម្រូវការសហគ្រាស",
  "依托中鼎在柬埔寨长期积累的企业资源与本地服务能力，为工程项目、企业客户和供应商提供可靠、高效的合作对接。": "ដោយផ្អែកលើធនធាន និងបទពិសោធន៍ក្នុងស្រុករបស់ Zhongding យើងភ្ជាប់គម្រោង សហគ្រាស និងអ្នកផ្គត់ផ្គង់ដោយភាពជឿជាក់ និងប្រសិទ្ធភាព។",
  "查找供应商": "ស្វែងរកអ្នកផ្គត់ផ្គង់", "供应商入驻": "ចុះឈ្មោះអ្នកផ្គត់ផ្គង់", "发布采购询价": "ដាក់សំណើតម្លៃទិញ", "平台人工对接": "ការសម្របសម្រួលដោយបុគ្គលិកវេទិកា",
  "建筑材料": "សម្ភារៈសំណង់", "钢结构": "រចនាសម្ព័ន្ធដែក", "工程施工": "ការងារសាងសង់", "防水维修": "ជួសជុលការពារទឹកជ្រាប",
  "家具设备": "គ្រឿងសង្ហារឹម និងឧបករណ៍", "物流运输": "ដឹកជញ្ជូន", "财税法务": "ហិរញ្ញវត្ថុ ពន្ធ និងច្បាប់", "酒店及企业服务": "សេវាសណ្ឋាគារ និងសហគ្រាស",
  "新增供应商": "បន្ថែមអ្នកផ្គត់ផ្គង់", "一键分享": "ចែករំលែកមួយចុច", "海报生成": "បង្កើតផ្ទាំងផ្សព្វផ្សាយ",
  "企业在线提交，后台审核后上线": "សហគ្រាសដាក់ស្នើតាមអ៊ីនធឺណិត ហើយបង្ហាញបន្ទាប់ពីពិនិត្យ", "供应商资料可直接转发给客户": "ព័ត៌មានអ្នកផ្គត់ផ្គង់អាចផ្ញើទៅអតិថិជនដោយផ្ទាល់",
  "自动生成企业推广海报并保存": "បង្កើត និងរក្សាទុកផ្ទាំងផ្សព្វផ្សាយសហគ្រាសដោយស្វ័យប្រវត្តិ", "浏览供应商": "មើលអ្នកផ្គត់ផ្គង់",
  "预订前说明清楚，入住更放心": "ព័ត៌មានច្បាស់មុនកក់ ដើម្បីស្នាក់នៅដោយទំនុកចិត្ត", "提交需求后，由中文客服核实房态、最终价格和服务安排，再确认订单。": "បន្ទាប់ពីដាក់សំណើ បុគ្គលិកនឹងបញ្ជាក់បន្ទប់ តម្លៃចុងក្រោយ និងសេវា មុនបញ្ជាក់ការកក់។",
  "真实信息": "ព័ត៌មានពិត", "付款说明": "ការណែនាំការបង់ប្រាក់", "退款规则": "គោលការណ៍សងប្រាក់",
  "房型图片、地址、设施和入住政策以酒店最终确认为准。": "រូបបន្ទប់ អាសយដ្ឋាន បរិក្ខារ និងគោលការណ៍ស្នាក់នៅ អាស្រ័យលើការបញ្ជាក់ចុងក្រោយរបស់សណ្ឋាគារ។",
  "支持方式由客服按订单确认；微信、支付宝及银行卡付款请先咨询。": "វិធីបង់ប្រាក់ត្រូវបញ្ជាក់តាមការកក់។ សូមសាកសួរមុនបង់តាម WeChat, Alipay ឬកាតធនាគារ។",
  "免费取消期限、不可退订单及退款时间会在付款前明确告知。": "រយៈពេលលុបចោលដោយឥតគិតថ្លៃ លក្ខខណ្ឌមិនសងប្រាក់ និងពេលវេលាសងប្រាក់ នឹងជូនដំណឹងមុនបង់ប្រាក់។",
  "入住、接送或行程出现问题，可联系中文客服协助处理。": "បើមានបញ្ហាក្នុងការស្នាក់នៅ ការដឹកជញ្ជូន ឬដំណើរ សូមទាក់ទងបុគ្គលិកសម្រាប់ជំនួយ។",
  "预订与咨询": "កក់ និងសាកសួរ", "客房预订、月租公寓和企业合作，欢迎直接联系我们。": "សម្រាប់ការកក់បន្ទប់ អាផាតមិនប្រចាំខែ និងកិច្ចសហការសហគ្រាស សូមទាក់ទងយើង។",
  "电话 / KH": "ទូរស័ព្ទ / KH", "中文服务": "សេវាភាសាចិន", "中鼎 AI 客服": "ជំនួយការ AI Zhongding",
  "酒店住宿 · 企业服务 · 供应链咨询": "ការស្នាក់នៅ · សេវាសហគ្រាស · ប្រឹក្សាផ្គត់ផ្គង់",
  "您好，我是中鼎 AI 客服。您可以咨询客房、月租公寓、企业住宿、供应商入驻或采购询价。": "សួស្តី ខ្ញុំជាជំនួយការ AI Zhongding។ អ្នកអាចសាកសួរអំពីបន្ទប់ អាផាតមិន សហគ្រាស អ្នកផ្គត់ផ្គង់ ឬការទិញ។",
  "关闭": "បិទ", "发送": "ផ្ញើ", "搜索": "ស្វែងរក", "请选择": "សូមជ្រើសរើស", "备注": "កំណត់សម្គាល់",
  "提交预订需求": "ដាក់សំណើកក់", "提交采购询价": "ដាក់សំណើតម្លៃទិញ", "申请供应商入驻": "ស្នើចុះឈ្មោះអ្នកផ្គត់ផ្គង់",
  "姓名 *": "ឈ្មោះ *", "联系人 *": "អ្នកទំនាក់ទំនង *", "联系电话": "លេខទូរស័ព្ទ", "电话 / WhatsApp *": "ទូរស័ព្ទ / WhatsApp *",
  "企业名称 *": "ឈ្មោះសហគ្រាស *", "供应商分类 *": "ប្រភេទអ្នកផ្គត់ផ្គង់ *", "所在城市": "ទីក្រុង", "企业地址": "អាសយដ្ឋានសហគ្រាស",
  "主营产品或服务 *": "ផលិតផល ឬសេវាសំខាន់ *", "企业简介": "ប្រវត្តិសហគ្រាស", "提交入驻申请": "ដាក់សំណើចូលរួម",
  "带 * 为必填项。电话或 WhatsApp 至少填写一项。": "វាលមានសញ្ញា * ត្រូវបំពេញ។ សូមបំពេញទូរស័ព្ទ ឬ WhatsApp យ៉ាងហោចណាស់មួយ។",
  "请选择入住和退房日期，酒店将确认实际房态。": "សូមជ្រើសថ្ងៃចូល និងថ្ងៃចេញ។ សណ្ឋាគារនឹងបញ្ជាក់បន្ទប់ដែលមាន។",
  "付款方式": "វិធីបង់ប្រាក់", "订单与付款指南": "ការណែនាំការកក់ និងបង់ប្រាក់", "安全提醒": "ការរំលឹកសុវត្ថិភាព",
  "酒店确认订单": "សណ្ឋាគារបញ្ជាក់ការកក់", "选择付款方式": "ជ្រើសវិធីបង់ប្រាក់", "等待到账确认": "រង់ចាំការបញ្ជាក់ការទូទាត់",
  "标准双床房 | ZIEC HOTEL": "បន្ទប់គ្រែពីរស្តង់ដារ | ZIEC HOTEL", "VIP房 | ZIEC HOTEL": "បន្ទប់ VIP | ZIEC HOTEL",
  "ZIEC HOTEL · 中鼎国际酒店": "ZIEC HOTEL · សណ្ឋាគារអន្តរជាតិ Zhongding", "中鼎国际酒店 · 供应链平台": "សណ្ឋាគារអន្តរជាតិ Zhongding · វេទិកាផ្គត់ផ្គង់",
  "打开菜单": "បើកម៉ឺនុយ", "主导航": "ម៉ឺនុយមេ", "打开AI客服": "បើកជំនួយការ AI", "请输入您的问题…": "សូមបញ្ចូលសំណួររបស់អ្នក…",
  "联系中文客服": "ទាក់ទងសេវាអតិថិជន", "住宿、月租、团房、接送与企业合作，由客服根据实际需求确认。": "ការស្នាក់នៅ ប្រចាំខែ បន្ទប់ជាក្រុម ការដឹកជញ្ជូន និងកិច្ចសហការសហគ្រាស នឹងបញ្ជាក់តាមតម្រូវការជាក់ស្តែង។",
  "运营主体：": "ប្រតិបត្តិករ៖", "服务城市：": "ទីក្រុងសេវាកម្ម៖", "电话：": "ទូរស័ព្ទ៖", "邮箱：": "អ៊ីមែល៖",
  "柬埔寨金边，并协助对接西港、暹粒相关需求": "ភ្នំពេញ កម្ពុជា និងជួយភ្ជាប់តម្រូវការនៅព្រះសីហនុ និងសៀមរាប",
  "酒店准确定位和到店导航，请联系中文客服获取最新地图链接。": "សម្រាប់ទីតាំង និងការណែនាំទៅសណ្ឋាគារ សូមទាក់ទងបុគ្គលិកដើម្បីទទួលតំណផែនទីថ្មីបំផុត។", "拨打电话": "ហៅទូរស័ព្ទ",
  "企业团房与长期住宿": "បន្ទប់ជាក្រុមសហគ្រាស និងការស្នាក់នៅរយៈពេលវែង", "让企业住宿安排更省心": "ធ្វើឱ្យការរៀបចំកន្លែងស្នាក់នៅសហគ្រាសកាន់តែងាយស្រួល",
  "面向驻柬企业、工程项目与商务团队，提供团房、员工宿舍、月租公寓和长期协议价。": "សម្រាប់សហគ្រាស គម្រោងវិស្វកម្ម និងក្រុមអាជីវកម្មនៅកម្ពុជា ផ្តល់បន្ទប់ជាក្រុម កន្លែងស្នាក់បុគ្គលិក អាផាតមិនប្រចាំខែ និងតម្លៃកិច្ចសន្យារយៈពេលវែង។",
  "团队与项目住宿": "ការស្នាក់នៅសម្រាប់ក្រុម និងគម្រោង", "按人数、周期、房型和预算统一报价，支持长期项目安排。": "ផ្តល់តម្លៃតាមចំនួនមនុស្ស រយៈពេល ប្រភេទបន្ទប់ និងថវិកា ហើយគាំទ្រគម្រោងរយៈពេលវែង។",
  "员工月租": "ការជួលប្រចាំខែសម្រាប់បុគ្គលិក", "客房与公寓组合，适合员工宿舍、管理人员长住和轮换入住。": "បន្ទប់ និងអាផាតមិន សម្រាប់បុគ្គលិក អ្នកគ្រប់គ្រងស្នាក់យូរ និងការប្តូរវេន។",
  "商务接待": "ការទទួលភ្ញៀវអាជីវកម្ម", "中文客服协助入住、接送、会议及本地行程安排。": "បុគ្គលិកជួយការចូលស្នាក់ ការដឹកជញ្ជូន កិច្ចប្រជុំ និងដំណើរក្នុងស្រុក។",
  "协议合作": "កិច្ចសហការតាមកិច្ចព្រមព្រៀង", "根据实际合作周期确认协议价、结算方式和服务范围。": "បញ្ជាក់តម្លៃកិច្ចសន្យា វិធីទូទាត់ និងវិសាលភាពសេវាតាមរយៈពេលសហការ។", "获取企业方案": "ទទួលផែនការសហគ្រាស",
  "常见问题": "សំណួរញឹកញាប់", "关于预订、月租、企业团房和中文服务的直接说明。": "ចម្លើយអំពីការកក់ ការជួលប្រចាំខែ បន្ទប់ជាក្រុម និងសេវាអតិថិជន។",
  "中国客人如何预订？": "តើភ្ញៀវចិនកក់យ៉ាងដូចម្តេច?", "在酒店页面提交姓名、联系方式、日期、人数和房型，中文客服确认后回复。": "ដាក់ឈ្មោះ ទំនាក់ទំនង កាលបរិច្ឆេទ ចំនួនភ្ញៀវ និងប្រភេទបន្ទប់នៅទំព័រសណ្ឋាគារ ហើយបុគ្គលិកនឹងឆ្លើយបន្ទាប់ពីបញ្ជាក់។",
  "是否支持中文服务？": "តើមានសេវាភាសាចិនទេ?", "支持中文住宿咨询、企业团房、接送包车和本地服务对接。": "មានសេវាប្រឹក្សាការស្នាក់នៅ បន្ទប់សហគ្រាស ការដឹកជញ្ជូន ជួលរថយន្ត និងសេវាក្នុងស្រុក។",
  "月租包含哪些费用？": "ការជួលប្រចាំខែរួមបញ្ចូលថ្លៃអ្វីខ្លះ?", "月租公寓US$260/月起，费用包含、押金及水电标准以确认方案为准。": "អាផាតមិនចាប់ពី US$260/ខែ។ ថ្លៃរួម ប្រាក់កក់ ទឹក និងអគ្គិសនី អាស្រ័យលើផែនការដែលបានបញ្ជាក់។",
  "企业团房如何报价？": "តើបន្ទប់ជាក្រុមសហគ្រាសគិតតម្លៃយ៉ាងដូចម្តេច?", "根据入住人数、周期、房型、接送及结算需求制定协议方案。": "រៀបចំផែនការតាមចំនួនភ្ញៀវ រយៈពេល ប្រភេទបន្ទប់ ការដឹកជញ្ជូន និងការទូទាត់។",
  "接送包车如何收费？": "តើសេវាដឹកជញ្ជូន និងជួលរថយន្តគិតថ្លៃយ៉ាងដូចម្តេច?", "根据出发地、目的地、车型、人数和使用时长确认报价。": "តម្លៃអាស្រ័យលើទីតាំងចេញ គោលដៅ ប្រភេទរថយន្ត ចំនួនមនុស្ស និងរយៈពេលប្រើប្រាស់។",
  "取消和退款规则是什么？": "តើគោលការណ៍លុបចោល និងសងប្រាក់ជាអ្វី?", "付款前会说明取消期限、不可退条件和退款时间，确认后再付款。": "លក្ខខណ្ឌលុបចោល មិនសងប្រាក់ និងពេលសងប្រាក់ នឹងជូនដំណឹងមុនបង់ប្រាក់។",
  "其他入住要求": "តម្រូវការស្នាក់នៅផ្សេងទៀត", "员工宿舍": "កន្លែងស្នាក់នៅបុគ្គលិក", "月租长住": "ជួលប្រចាំខែរយៈពេលវែង", "短期住宿": "ការស្នាក់នៅខ្លី",
  "暂不需要": "មិនត្រូវការឥឡូវនេះ", "需要机场接送，请联系报价": "ត្រូវការដឹកជញ្ជូនអាកាសយានដ្ឋាន សូមទាក់ទងសម្រាប់តម្លៃ", "需要包车服务，请联系报价": "ត្រូវការជួលរថយន្ត សូមទាក់ទងសម្រាប់តម្លៃ",
  "填写后由中文客服确认实际房态与价格，正常情况下预计10分钟内回复。": "បន្ទាប់ពីបំពេញ បុគ្គលិកនឹងបញ្ជាក់បន្ទប់ និងតម្លៃ។ ជាទូទៅរំពឹងថានឹងឆ្លើយក្នុងរយៈពេល 10 នាទី។",
  "此表单不是实时房态查询；提交后由中文客服确认房态、总价和入住安排。": "ទម្រង់នេះមិនមែនជាការពិនិត្យបន្ទប់ភ្លាមៗទេ។ បន្ទាប់ពីដាក់ស្នើ បុគ្គលិកនឹងបញ្ជាក់បន្ទប់ តម្លៃសរុប និងការរៀបចំស្នាក់នៅ។",
  "中国 / Cambodia": "ចិន / កម្ពុជា", "企业团队住宿": "ការស្នាក់នៅក្រុមសហគ្រាស", "三间卧室 · 独立客厅 · 舒适多人入住": "បន្ទប់គេងបី · បន្ទប់ទទួលភ្ញៀវដាច់ដោយឡែក · សម្រាប់ភ្ញៀវច្រើន",
  "平台身份与服务范围": "អត្តសញ្ញាណវេទិកា និងវិសាលភាពសេវា", "咨询接送包车 →": "សាកសួរការដឹកជញ្ជូន និងជួលរថយន្ត →", "查看住宿公寓 →": "មើលសណ្ឋាគារ និងអាផាតមិន →",
  "联系我们｜ZIEC HOTEL 柬埔寨中文客服": "ទាក់ទងយើង｜ZIEC HOTEL Cambodia",
  "柬埔寨企业团房与长期住宿｜ZIEC HOTEL": "បន្ទប់ជាក្រុមសហគ្រាស និងការស្នាក់នៅយូរនៅកម្ពុជា｜ZIEC HOTEL",
  "常见问题｜ZIEC HOTEL": "សំណួរញឹកញាប់｜ZIEC HOTEL", "AI 客服": "ជំនួយការ AI",
  "采购询价 | ZIEC": "សំណើតម្លៃទិញ | ZIEC", "采购需求登记": "ចុះបញ្ជីតម្រូវការទិញ", "公司名称": "ឈ្មោះក្រុមហ៊ុន",
  "采购分类 *": "ប្រភេទទិញ *", "预算范围": "ជួរថវិកា", "采购内容 *": "មាតិកាទិញ *", "期望交付时间": "ពេលវេលាប្រគល់ដែលរំពឹងទុក",
  "提交采购需求，由中鼎供应链平台协助联系合适供应商。": "ដាក់តម្រូវការទិញ ហើយវេទិកា Zhongding នឹងជួយទាក់ទងអ្នកផ្គត់ផ្គង់សមស្រប។",
  "适用于工程材料、设备、施工服务、物流运输和企业服务采购。": "សម្រាប់ទិញសម្ភារៈវិស្វកម្ម ឧបករណ៍ សេវាសំណង់ ដឹកជញ្ជូន និងសេវាសហគ្រាស។",
  "WhatsApp 核对订单与付款": "បញ្ជាក់ការកក់ និងការបង់ប្រាក់តាម WhatsApp",
  "不要向非官方联系人付款；不要在聊天或网页表单中发送完整银行卡资料、密码或验证码。": "កុំបង់ប្រាក់ទៅអ្នកទំនាក់ទំនងមិនផ្លូវការ និងកុំផ្ញើព័ត៌មានកាតធនាគារពេញលេញ ពាក្យសម្ងាត់ ឬលេខកូដផ្ទៀងផ្ទាត់ក្នុងការជជែក ឬទម្រង់គេហទំព័រ។",
  "付款前务必核对订单编号、金额、币种和收款方名称。": "មុនបង់ប្រាក់ សូមពិនិត្យលេខកក់ ចំនួនប្រាក់ រូបិយប័ណ្ណ និងឈ្មោះអ្នកទទួល។",
  "ZIEC LIFE Cambodia | 中鼎国际酒店": "ZIEC LIFE Cambodia | សណ្ឋាគារអន្តរជាតិ Zhongding", "住": "ស្នាក់", "行": "ធ្វើដំណើរ", "商": "អាជីវកម្ម", "供": "ផ្គត់ផ្គង់",
  "STAY · 住": "STAY · ស្នាក់", "MOVE · 行": "MOVE · ធ្វើដំណើរ", "BUSINESS · 商": "BUSINESS · អាជីវកម្ម", "SUPPLY · 供": "SUPPLY · ផ្គត់ផ្គង់",
  "行｜接送包车与本地协助": "ធ្វើដំណើរ｜ដឹកជញ្ជូន ជួលរថយន្ត និងជំនួយក្នុងស្រុក",
  "接送、包车、司机与本地协助由客服先确认需求、价格与实际可用情况，适合游客、商务客和企业团队。": "ការដឹកជញ្ជូន ជួលរថយន្ត អ្នកបើកបរ និងជំនួយក្នុងស្រុក នឹងបញ្ជាក់តម្រូវការ តម្លៃ និងភាពអាចប្រើបានជាមុន សម្រាប់ភ្ញៀវទេសចរ អ្នកជំនួញ និងក្រុមសហគ្រាស។",
  "US$35 / 晚": "US$35 / យប់", "US$60 / 晚": "US$60 / យប់", "US$70 / 晚": "US$70 / យប់", "US$260 / 月起": "ចាប់ពី US$260 / ខែ",
  "精美三室一厅套房｜US$60/晚 | ZIEC HOTEL": "ស៊ុយបីបន្ទប់គេង និងបន្ទប់ទទួលភ្ញៀវ｜US$60/យប់ | ZIEC HOTEL",
  "真实套房照片，三间卧室与独立客厅，适合家庭、朋友多人同行及企业接待。": "រូបស៊ុយពិត មានបន្ទប់គេងបី និងបន្ទប់ទទួលភ្ញៀវដាច់ដោយឡែក សម្រាប់គ្រួសារ មិត្តភក្តិ និងសហគ្រាស។",
  "三间独立卧室": "បន្ទប់គេងដាច់ដោយឡែកបី", "宽敞独立客厅": "បន្ទប់ទទួលភ្ញៀវធំទូលាយដាច់ដោយឡែក", "家庭及多人入住优选": "ជម្រើសល្អសម្រាប់គ្រួសារ និងភ្ញៀវច្រើន", "适合企业接待": "សម្រាប់ការទទួលភ្ញៀវសហគ្រាស",
  "月租公寓 | ZIEC HOTEL": "អាផាតមិនប្រចាំខែ | ZIEC HOTEL", "US$260 / month 起": "ចាប់ពី US$260 / ខែ", "US$260/月起": "ចាប់ពី US$260/ខែ",
  "月租公寓配备客厅、卧室、阳台、电视、空调及简易厨房，适合长期住宿与企业客户。": "អាផាតមិនមានបន្ទប់ទទួលភ្ញៀវ បន្ទប់គេង យ៉រ ទូរទស្សន៍ ម៉ាស៊ីនត្រជាក់ និងផ្ទះបាយតូច សម្រាប់ការស្នាក់នៅយូរ និងអតិថិជនសហគ្រាស។",
  "客厅与独立睡眠区": "បន្ទប់ទទួលភ្ញៀវ និងកន្លែងគេងដាច់ដោយឡែក", "阳台与简易厨房": "យ៉រ និងផ្ទះបាយតូច", "长期入住可咨询优惠": "សាកសួរអំពីតម្លៃពិសេសសម្រាប់ការស្នាក់នៅយូរ"
});

const I18N_PAGE_META = {
  en: {
    "/": {
      title: "ZIEC HOTEL | Cambodia Hotel & Local Business Services",
      description:
        "ZIEC HOTEL provides hotel stays, monthly apartments, airport transfers, car service, corporate accommodation and supplier connections in Cambodia."
    },
    "/index": {
      title: "ZIEC HOTEL | Cambodia Hotel & Local Business Services",
      description:
        "ZIEC HOTEL provides hotel stays, monthly apartments, airport transfers, car service, corporate accommodation and supplier connections in Cambodia."
    },
    "/hotels": {
      title: "Hotel Stays & Booking | ZIEC HOTEL",
      description:
        "Cambodia hotel booking and monthly apartment service with room details, stay policies, corporate rates and local support."
    },
    "/suppliers": {
      title: "Supplier Platform | ZIEC",
      description:
        "ZIEC supply chain platform for Cambodia construction, engineering, logistics and business service suppliers."
    },
    "/standard": {
      title: "Standard Twin Room | ZIEC HOTEL",
      description:
        "Real twin room photos, suitable for colleagues, friends and business teams."
    },
    "/vip": {
      title: "VIP Room | ZIEC HOTEL",
      description:
        "Real VIP room photos with spacious comfort for business reception and quality stays."
    },
    "/three-bedroom-suite": {
      title: "Three-Bedroom Suite · US$60/night | ZIEC HOTEL",
      description:
        "A three-bedroom suite with a separate living room for families, groups and corporate stays."
    },
    "/join": {
      title: "Supplier Application | ZIEC",
      description:
        "Submit company information to join the ZIEC Cambodia supply chain platform."
    },
    "/payment": {
      title: "Order & Payment Guide | ZIEC HOTEL",
      description:
        "Confirm hotel orders, verify official payment details and learn payment safety notes."
    }
  },
  kh: {
    "/": { title: "ZIEC HOTEL | សណ្ឋាគារ និងសេវាកម្មនៅកម្ពុជា", description: "សណ្ឋាគារ អាផាតមិន សេវាកម្មសហគ្រាស និងបណ្តាញអ្នកផ្គត់ផ្គង់នៅកម្ពុជា។" },
    "/index": { title: "ZIEC HOTEL | សណ្ឋាគារ និងសេវាកម្មនៅកម្ពុជា", description: "សណ្ឋាគារ អាផាតមិន សេវាកម្មសហគ្រាស និងបណ្តាញអ្នកផ្គត់ផ្គង់នៅកម្ពុជា។" },
    "/hotels": { title: "សណ្ឋាគារ និងការកក់ | ZIEC HOTEL", description: "មើលបន្ទប់ អាផាតមិន និងដាក់សំណើស្នាក់នៅ។" },
    "/suppliers": { title: "វេទិកាផ្គត់ផ្គង់ | ZIEC", description: "បណ្តាញអ្នកផ្គត់ផ្គង់ និងសេវាកម្មសហគ្រាសនៅកម្ពុជា។" }
  }
};
const originalText = new WeakMap();
const originalAttrs = new WeakMap();
function getLanguage() {
  const requested = new URLSearchParams(location.search).get("lang");
  if (["zh", "en", "kh"].includes(requested)) return requested;
  try {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    if (["zh", "en", "kh"].includes(stored)) return stored;
  } catch (e) {}
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}
function normalizePageKey() {
  let path = location.pathname.replace(/\/$/, "") || "/";
  path = path.replace(/\.html$/, "");
  return path;
}
function translateTextValue(text, lang) {
  if (lang === "zh") return text;
  if (lang === "kh") {
    return I18N_TEXT.kh?.[text.trim()] || text;
  }
  return I18N_TEXT[lang]?.[text.trim()] || text;
}
function translateElementTree(lang) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const raw = originalText.get(node);
    const leading = raw.match(/^\s*/)?.[0] || "";
    const trailing = raw.match(/\s*$/)?.[0] || "";
    const translated = translateTextValue(raw.trim(), lang);
    node.nodeValue = `${leading}${translated}${trailing}`;
  });
  document.querySelectorAll("[placeholder],[aria-label],[title]").forEach((el) => {
    if (!originalAttrs.has(el)) {
      originalAttrs.set(el, {
        placeholder: el.getAttribute("placeholder"),
        ariaLabel: el.getAttribute("aria-label"),
        title: el.getAttribute("title")
      });
    }
    const attrs = originalAttrs.get(el);
    if (attrs.placeholder) el.setAttribute("placeholder", translateTextValue(attrs.placeholder, lang));
    if (attrs.ariaLabel) el.setAttribute("aria-label", translateTextValue(attrs.ariaLabel, lang));
    if (attrs.title) el.setAttribute("title", translateTextValue(attrs.title, lang));
  });
}
function applyPageMeta(lang) {
  const key = normalizePageKey();
  const meta = I18N_PAGE_META[lang]?.[key] || I18N_PAGE_META[lang]?.[key.replace(/^\//, "/")];
  if (lang === "zh") {
    document.title = document.documentElement.dataset.zhTitle || document.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && desc.dataset.zhContent) desc.setAttribute("content", desc.dataset.zhContent);
    return;
  }
  if (!meta) return;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
}
function updateLanguageButtons(lang) {
  document.querySelectorAll("[data-lang-option]").forEach((btn) => {
    const active = btn.dataset.langOption === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}
function setLanguage(lang) {
  try {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
  } catch (e) {}
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "kh" ? "km" : "en";
  const languageUrl = new URL(location.href);
  if (lang === "zh") languageUrl.searchParams.delete("lang");
  else languageUrl.searchParams.set("lang", lang);
  history.replaceState(null, "", languageUrl);
  translateElementTree(lang);
  applyPageMeta(lang);
  updateLanguageButtons(lang);
}
function refreshCurrentLanguage() {
  const lang = getLanguage();
  translateElementTree(lang);
  applyPageMeta(lang);
  updateLanguageButtons(lang);
}
function normalizePublicNavigation() {
  const nav = document.querySelector(".nav-links");
  if (!nav || normalizePageKey() === "/admin") return;

  const page = normalizePageKey();
  const hotelPages = new Set([
    "/hotels",
    "/standard",
    "/vip",
    "/monthly",
    "/three-bedroom-suite",
    "/payment"
  ]);
  const supplierPages = new Set(["/suppliers", "/join", "/inquiry"]);
  const active = page === "/" || page === "/index"
    ? "home"
    : hotelPages.has(page)
      ? "hotel"
      : page === "/corporate"
        ? "corporate"
        : supplierPages.has(page)
          ? "suppliers"
          : page === "/contact"
            ? "contact"
            : "";

  const item = (key, href, label) =>
    `<a${active === key ? ' class="active"' : ""} href="${href}">${label}</a>`;
  nav.setAttribute("aria-label", "主导航");
  nav.innerHTML = [
    item("home", "./index.html", "首页"),
    item("hotel", "./hotels.html#hotel-stay", "酒店公寓"),
    item("corporate", "./hotels.html#corporate", "企业服务"),
    item("suppliers", "./suppliers.html", "供应链平台"),
    item("contact", "./hotels.html#contact", "联系我们"),
    '<button class="nav-ai" type="button" data-ai-open>AI客服</button>'
  ].join("");
}
function initLanguageSwitcher() {
  document.documentElement.dataset.zhTitle = document.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.dataset.zhContent = desc.getAttribute("content") || "";
  const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href.split("?")[0];
  [["zh-CN", "zh"], ["en", "en"], ["km", "kh"]].forEach(([code, lang]) => {
    if (document.head.querySelector(`link[hreflang="${code}"]`)) return;
    const link = document.createElement("link"); link.rel = "alternate"; link.hreflang = code;
    link.href = lang === "zh" ? canonical : `${canonical}${canonical.includes("?") ? "&" : "?"}lang=${lang}`;
    document.head.appendChild(link);
  });
  const nav = document.querySelector(".nav-links");
  if (nav && !nav.querySelector(".lang-switch")) {
    const switcher = document.createElement("div");
    switcher.className = "lang-switch";
    switcher.setAttribute("aria-label", "Language");
    switcher.innerHTML = `<button type="button" data-lang-option="zh">中</button><button type="button" data-lang-option="en">EN</button><button type="button" data-lang-option="kh">KH</button>`;
    const cta = nav.querySelector(".nav-cta");
    nav.insertBefore(switcher, cta || null);
    switcher.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", () => setLanguage(btn.dataset.langOption))
    );
  }
  setLanguage(getLanguage());
}
normalizePublicNavigation();
initLanguageSwitcher();
async function initPublicSiteSettings() {
  const section = document.querySelector("#homeVideo");
  if (!section) return;
  try {
    const response = await fetch("/api/site-settings");
    const payload = await response.json();
    if (!response.ok || !payload.data?.video_enabled || !payload.data.video_url) return;
    const s = payload.data;
    section.hidden = false;
    document.querySelector("#homeVideoTitle").textContent = s.video_title;
    document.querySelector("#homeVideoDescription").textContent = s.video_description;
    document.querySelector("#homeVideoCover").src = s.video_cover || "./assets/ziec-cover-v66.png";
    document.querySelector("#homeVideoPlay").addEventListener("click", () => window.open(s.video_url, "_blank", "noopener"));
    [["#wechatChannelsLink", s.wechat_channels_url], ["#youtubeLink", s.youtube_url]].forEach(([selector, url]) => {
      const link = document.querySelector(selector); if (url) { link.href = url; link.hidden = false; }
    });
  } catch (e) { /* Keep the original homepage available if settings are offline. */ }
}
initPublicSiteSettings();
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
async function sharePage(button) {
  const url = button.dataset.url || location.href;
  const title = button.dataset.title || document.title;
  const text = button.dataset.text || title;
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      showToast("链接已复制");
    }
  } catch (e) {
    if (e.name !== "AbortError") showToast("分享未完成");
  }
}
async function copyLink(button) {
  const url = button.dataset.url || location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast("链接已复制");
  } catch (e) {
    showToast("复制失败，请手动复制");
  }
}
document
  .querySelectorAll("[data-share]")
  .forEach((b) => b.addEventListener("click", () => sharePage(b)));
document
  .querySelectorAll("[data-copy]")
  .forEach((b) => b.addEventListener("click", () => copyLink(b)));
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

// ZIEC Supply Chain V5.5
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
async function jsonFetch(url, options = {}) {
  const r = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const diagnostic = j.requestId
      ? `（错误代码：${j.code || "UNKNOWN"}；诊断号：${j.requestId}）`
      : j.code
        ? `（错误代码：${j.code}）`
        : "";
    throw new Error(`${j.message || "操作失败"}${diagnostic}`);
  }
  return j;
}
async function loadSuppliers() {
  const grid = document.querySelector("#supplierGrid");
  if (!grid) return;
  const status = document.querySelector("#supplierStatus");
  try {
    const j = await jsonFetch("/api/suppliers");
    window.__suppliers = j.data || [];
    renderSuppliers(window.__suppliers);
    status.textContent = `共 ${window.__suppliers.length} 家已审核供应商`;
    refreshCurrentLanguage();
  } catch (e) {
    status.textContent = e.message;
    grid.innerHTML = "";
  }
}

async function loadHomeRecommendations() {
  const hotelGrid = document.querySelector("#homeHotelGrid");
  const supplierGrid = document.querySelector("#homeSupplierGrid");
  const fallbackHotels = [
    {
      label: "酒店住宿",
      title: "中鼎国际酒店 · 标准双床房",
      price: "US$ 35 / 晚",
      image: "assets/twin-room.jpg",
      href: "./payment.html?room=%E6%A0%87%E5%87%86%E5%8F%8C%E5%BA%8A%E6%88%BF&price=35",
    },
    {
      label: "酒店住宿",
      title: "中鼎国际酒店 · VIP房",
      price: "US$ 70 / 晚",
      image: "assets/suite-room.jpg",
      href: "./payment.html?room=VIP%E6%88%BF&price=70",
    },
    {
      label: "家庭与多人入住",
      title: "中鼎国际酒店 · 精美三室一厅套房",
      price: "US$ 60 / 晚",
      image: "assets/room-3-1.jpg",
      href: "./payment.html?room=%E7%B2%BE%E7%BE%8E%E4%B8%89%E5%AE%A4%E4%B8%80%E5%8E%85%E5%A5%97%E6%88%BF&price=60",
    },
    {
      label: "长租公寓",
      title: "金边月租公寓 · 长住方案",
      price: "US$ 260 / 月起",
      image: "assets/monthly-6.jpg",
      href: "./hotels.html",
    },
    {
      label: "企业住宿",
      title: "企业协议住宿 · 团队接待",
      price: "月结、长住与接待需求可核价",
      href: "./hotels.html",
    },
  ];
  const fallbackSuppliers = [
    { label: "供应链入口", title: "建筑材料与工程物资", meta: "采购、报价、交付对接", href: "./suppliers.html" },
    { label: "供应链入口", title: "家具设备与酒店用品", meta: "房间、办公与餐饮配套", href: "./suppliers.html" },
    { label: "供应链入口", title: "维修安装与本地协助", meta: "长期合作供应商招募", href: "./join.html" },
    { label: "供应链入口", title: "物流运输与资源对接", meta: "中柬、本地与项目协同", href: "./suppliers.html" },
  ];
  const renderHotelRecommendations = (list) =>
    list
      .slice(0, 10)
      .map((h) => {
        const image = Array.isArray(h.image_urls) ? h.image_urls[0] : h.image;
        const title = h.title || `${h.name || "中鼎国际酒店"} · ${h.room_type || ""}`;
        const price =
          typeof h.price === "number" || /^\d+(\.\d+)?$/.test(String(h.price || ""))
            ? `US$ ${h.price} / ${h.price_unit || "晚"}`
            : h.price || h.meta || "";
        const href = h.href || "./hotels.html";
        return `<article class="recommend-card">${image ? `<img src="${esc(image)}" alt="${esc(title)}" loading="lazy">` : '<div class="recommend-placeholder">ZIEC HOTEL</div>'}<div><small>${esc(h.label || (h.featured ? "推荐酒店" : "酒店住宿"))}</small><h3>${esc(title)}</h3><p>${esc(price)}</p><a href="${esc(href)}">查看与预订 →</a></div></article>`;
      })
      .join("");
  const renderSupplierRecommendations = (list) =>
    list
      .slice(0, 20)
      .map((s) => {
        const image = Array.isArray(s.image_urls) ? s.image_urls[0] : s.image;
        const title = s.title || s.company_name || "供应链服务入口";
        const href = s.href || "./suppliers.html";
        return `<article class="recommend-card supplier-recommend">${image ? `<img src="${esc(image)}" alt="${esc(title)}" loading="lazy">` : '<div class="recommend-placeholder">ZIEC SUPPLY</div>'}<div><small>${esc(s.label || s.category || "供应商")}</small><h3>${esc(title)}</h3><p>${esc(s.meta || s.city || "柬埔寨本地资源对接")}</p><a href="${esc(href)}">查看供应商 →</a></div></article>`;
      })
      .join("");
  if (hotelGrid) {
    try {
      const j = await jsonFetch("/api/hotels?limit=10");
      hotelGrid.innerHTML = renderHotelRecommendations((j.data || []).length ? j.data : fallbackHotels);
      refreshCurrentLanguage();
    } catch (e) {
      hotelGrid.innerHTML = renderHotelRecommendations(fallbackHotels);
      refreshCurrentLanguage();
    }
  }
  if (supplierGrid) {
    try {
      const j = await jsonFetch("/api/suppliers?limit=20");
      supplierGrid.innerHTML = renderSupplierRecommendations((j.data || []).length ? j.data : fallbackSuppliers);
      refreshCurrentLanguage();
    } catch (e) {
      supplierGrid.innerHTML = renderSupplierRecommendations(fallbackSuppliers);
      refreshCurrentLanguage();
    }
  }
}
loadHomeRecommendations();

// V6.4: every public consultation area offers four channels for guests from
// different countries. Supplier cards render their own company-specific set.
function universalConsultationChannels(message = "您好，我想咨询ZIEC HOTEL的服务。") {
  const encoded = encodeURIComponent(message);
  return `<div class="universal-consult" data-universal-consult><div class="supplier-consult-title">选择咨询方式</div><div class="supplier-consult-actions icon-only-consult"><button class="consult-channel consult-wechat" type="button" title="微信" aria-label="微信咨询" data-contact-copy="微信" data-contact-message="${esc(message)}"><span class="consult-icon">微</span></button><a class="consult-channel consult-telegram" title="Telegram" aria-label="Telegram咨询" href="https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encoded}" target="_blank" rel="noopener"><span class="consult-icon">➤</span></a><button class="consult-channel consult-messenger" type="button" title="Messenger" aria-label="Messenger咨询" data-contact-copy="Messenger" data-contact-message="${esc(message)}"><span class="consult-icon">⚡</span></button><a class="consult-channel consult-whatsapp" title="WhatsApp" aria-label="WhatsApp咨询" href="https://wa.me/855189958899?text=${encoded}" target="_blank" rel="noopener"><span class="consult-icon">WA</span></a></div></div>`;
}
function enhanceConsultationAreas() {
  const hosts = new Set();
  document.querySelectorAll("a,button").forEach((el) => {
    if (!/咨询|consult/i.test(el.textContent || "")) return;
    if (el.closest("nav,.ai-widget,.supplier-card,[data-universal-consult]")) return;
    const host = el.closest(".actions,.share-actions,.info-panel,.contact-card") || el.parentElement;
    if (host && !host.querySelector(":scope > [data-universal-consult]")) hosts.add(host);
  });
  hosts.forEach((host) => host.insertAdjacentHTML("beforeend", universalConsultationChannels()));
}
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-contact-copy]");
  if (!button) return;
  const content = `ZIEC HOTEL\n${button.dataset.contactAccount ? `${button.dataset.contactCopy}：${button.dataset.contactAccount}\n` : ""}WhatsApp/电话：+855 018 995 8899\n${button.dataset.contactMessage || "咨询服务"}`;
  try { await navigator.clipboard.writeText(content); } catch (_) {}
  alert(`${button.dataset.contactCopy}联系资料已复制，请打开对应应用继续咨询。`);
});
enhanceConsultationAreas();
async function applyConsultationSettings() {
  try {
    const response = await fetch("/api/site-settings"), payload = await response.json(), s = payload.data || {};
    document.querySelectorAll(".consult-wechat").forEach((el) => el.dataset.contactAccount = s.wechat || "");
    document.querySelectorAll(".consult-telegram").forEach((el) => { if (s.telegram) el.href = /^https?:/i.test(s.telegram) ? s.telegram : `https://t.me/${s.telegram.replace(/^@/, "")}`; });
    document.querySelectorAll(".consult-messenger").forEach((el) => { if (s.messenger) { el.dataset.contactAccount = s.messenger; if (el.tagName === "A") el.href = s.messenger; } });
    document.querySelectorAll(".consult-whatsapp").forEach((el) => { if (s.whatsapp && el.tagName === "A") el.href = `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("您好，我想咨询ZIEC HOTEL的服务。")}`; });
  } catch (e) { /* Default public contacts remain available. */ }
}
applyConsultationSettings();

// V6.7: all pages show a clear release marker without changing the existing layout.
document.querySelectorAll(".footer-wrap").forEach((footer) => {
  if (!footer.textContent.includes("ZIEC HOTEL V6.7")) {
    const version = document.createElement("div");
    version.className = "site-version";
    version.textContent = "ZIEC HOTEL V6.7";
    footer.appendChild(version);
  }
});
function renderSuppliers(list) {
  const grid = document.querySelector("#supplierGrid");
  grid.innerHTML =
    list
      .map((s) => {
        const initials = esc((s.company_name || "Z").slice(0, 1));
        const images = Array.isArray(s.image_urls) ? s.image_urls.filter(Boolean) : [];
        const rawSupplier = JSON.stringify(JSON.stringify(s));
        const media = images.length
          ? `<button class="supplier-cover" type="button" onclick='openSupplierGallery(${rawSupplier},0)' aria-label="查看${esc(s.company_name)}全部图片"><img src="${esc(images[0])}" alt="${esc(s.company_name)} 推荐图片" loading="lazy"><span>共 ${images.length} 张 · 查看全部</span></button>`
          : `<div class="supplier-brand">${s.logo_url ? `<img src="${esc(s.logo_url)}" alt="${esc(s.company_name)} Logo" onerror="this.remove()">` : `<span>${initials}</span>`}</div>`;
        return `<article class="card supplier-card">${media}${s.featured ? '<div class="card-label supplier-featured">推荐供应商</div>' : ""}<div class="card-body"><div class="card-label">${esc(s.category || "企业服务")}</div><h3 class="supplier-company-name">${esc(s.company_name)}</h3>${s.slogan ? `<p class="supplier-slogan">${esc(s.slogan)}</p>` : ""}<dl class="supplier-contact"><div><dt>联系人</dt><dd>${esc(s.contact_name || "平台客服")}</dd></div><div><dt>电话</dt><dd>${s.phone || s.whatsapp ? `<a href="tel:${esc(s.phone || s.whatsapp)}">${esc(s.phone || s.whatsapp)}</a>` : "待补充"}</dd></div><div><dt>地址</dt><dd>${esc(s.address || s.city || "柬埔寨")}</dd></div></dl><p class="muted supplier-products">${esc(s.products || s.description || "")}</p><div class="supplier-consult-title">选择咨询方式</div><div class="supplier-consult-actions"><button class="consult-channel consult-wechat" onclick='consultSupplier("wechat",${rawSupplier})' aria-label="微信咨询"><span class="consult-icon">微</span><span>微信</span></button><button class="consult-channel consult-telegram" onclick='consultSupplier("telegram",${rawSupplier})' aria-label="Telegram咨询"><span class="consult-icon">➤</span><span>Telegram</span></button><button class="consult-channel consult-messenger" onclick='consultSupplier("messenger",${rawSupplier})' aria-label="Messenger咨询"><span class="consult-icon">⚡</span><span>Messenger</span></button><button class="consult-channel consult-whatsapp" onclick='consultSupplier("whatsapp",${rawSupplier})' aria-label="WhatsApp咨询"><span class="consult-icon">WA</span><span>WhatsApp</span></button></div><div class="supplier-actions supplier-secondary-actions"><button class="share-btn" onclick='openSupplierShare(${rawSupplier})'>分享推广</button><button class="share-btn" onclick='createSupplierPoster(${rawSupplier})'>生成海报</button></div></div></article>`;
      })
      .join("") || '<div class="muted">暂无符合条件的供应商。</div>';
  requestAnimationFrame(fitSupplierNames);
}

window.consultSupplier = async (platform, raw) => {
  const s = typeof raw === "string" ? JSON.parse(raw) : raw;
  const company = s.company_name || "该企业";
  const contact = s.phone || s.whatsapp || "";
  const message = `您好，我想咨询${company}的产品与服务。`;
  let account = String(s[platform] || "").trim();
  if (platform === "whatsapp") {
    const number = (account || contact || "855189958899").replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }
  if (platform === "wechat") {
    const value = account || contact;
    if (!value) return alert("该企业暂未填写微信或联系电话，请使用平台人工客服咨询。");
    try { await navigator.clipboard.writeText(value); } catch (_) {}
    alert(`微信联系信息已复制：${value}\n请打开微信添加好友，并发送：${message}`);
    return;
  }
  if (platform === "telegram" && account) {
    account = account.replace(/^https?:\/\/t\.me\//, "").replace(/^@/, "");
    window.open(`https://t.me/${encodeURIComponent(account)}`, "_blank", "noopener");
    return;
  }
  if (platform === "messenger" && account) {
    account = account.replace(/^https?:\/\/(?:www\.)?(?:m\.me\/|facebook\.com\/messages\/t\/)/, "");
    window.open(`https://m.me/${encodeURIComponent(account)}`, "_blank", "noopener");
    return;
  }
  if (contact) {
    try { await navigator.clipboard.writeText(`${company}\n${contact}\n${message}`); } catch (_) {}
    alert(`${platform === "telegram" ? "Telegram" : "Messenger"}账号尚未填写，企业联系电话与咨询内容已复制：\n${contact}`);
  } else {
    alert(`该企业暂未填写${platform === "telegram" ? "Telegram" : "Messenger"}账号，请使用平台人工客服咨询。`);
  }
};

function fitSupplierNames() {
  document.querySelectorAll(".supplier-company-name").forEach((name) => {
    let size = 28;
    name.style.fontSize = `${size}px`;
    while (name.scrollWidth > name.clientWidth && size > 16) {
      size -= 1;
      name.style.fontSize = `${size}px`;
    }
  });
}
document.querySelector("#supplierSearch")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const k = document.querySelector("#supplierKeyword").value.toLowerCase(),
    c = document.querySelector("#supplierCategory").value;
  renderSuppliers(
    (window.__suppliers || []).filter(
      (s) =>
        (!c || s.category === c) &&
        (!k ||
          `${s.company_name} ${s.products} ${s.description}`
            .toLowerCase()
            .includes(k)),
    ),
  );
});
async function submitDataForm(form, url, msg) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "正在提交……";
    msg.className = "form-message full";
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const j = await jsonFetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      msg.textContent = j.message;
      msg.className = "form-message full ok";
      form.reset();
    } catch (err) {
      msg.textContent = err.message;
      msg.className = "form-message full bad";
    }
  });
}
const jf = document.querySelector("#supplierJoinForm");
const imageInput = document.querySelector("#supplierImages");
const imagePreview = document.querySelector("#supplierImagePreview");
imageInput?.addEventListener("change", () => {
  const files = [...imageInput.files].slice(0, 10);
  if (imageInput.files.length > 10) {
    imageInput.value = "";
    imagePreview.innerHTML =
      '<span class="form-message bad">最多上传10张图片</span>';
    return;
  }
  imagePreview.innerHTML = files
    .map(
      (file, i) =>
        `<figure><img src="${URL.createObjectURL(file)}" alt="预览 ${i + 1}"><span>${i + 1}</span></figure>`,
    )
    .join("");
});
async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  let quality = 0.78;
  let data = canvas.toDataURL("image/jpeg", quality);
  while (data.length > 2.4 * 1024 * 1024 && quality > 0.5) {
    quality -= 0.08;
    data = canvas.toDataURL("image/jpeg", quality);
  }
  return data;
}
if (jf) {
  jf.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.querySelector("#joinMessage"),
      files = [...imageInput.files];
    if (files.length < 4 || files.length > 10) {
      msg.textContent = "请选择4–10张企业或产品图片";
      msg.className = "form-message full bad";
      return;
    }
    const progress = jf.querySelector(".upload-progress"),
      bar = progress.querySelector("i");
    progress.hidden = false;
    msg.textContent = "正在压缩并上传图片……";
    msg.className = "form-message full";
    try {
      const image_urls = [];
      for (let i = 0; i < files.length; i++) {
        msg.textContent = `正在处理第 ${i + 1}/${files.length} 张图片……`;
        const data = await compressImage(files[i]);
        const uploaded = await jsonFetch("/api/supplier-image", {
          method: "POST",
          body: JSON.stringify({ data }),
        });
        image_urls.push(uploaded.url);
        bar.style.width = `${Math.round(((i + 1) / files.length) * 100)}%`;
      }
      const data = Object.fromEntries(new FormData(jf).entries());
      delete data.supplier_images;
      data.image_urls = image_urls;
      const j = await jsonFetch("/api/suppliers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      msg.textContent = j.message;
      msg.className = "form-message full ok";
      jf.reset();
      imagePreview.innerHTML = "";
    } catch (err) {
      msg.textContent = `上传未完成：${err.message}`;
      msg.className = "form-message full bad";
    } finally {
      progress.hidden = true;
      bar.style.width = "0";
    }
  });
}
const inf = document.querySelector("#inquiryForm");
if (inf)
  submitDataForm(
    inf,
    "/api/inquiries",
    document.querySelector("#inquiryMessage"),
  );
const login = document.querySelector("#adminLogin"),
  dash = document.querySelector("#adminDashboard"),
  content = document.querySelector("#adminContent");
let adminTab = "suppliers";
let adminRows = [];
const statusName = { pending: "待审核", approved: "已通过", rejected: "已驳回", paused: "已暂停", draft: "草稿", published: "已发布", new: "新询价" };
function renderSupplierAdmin(rows) {
  const counts = ["all", "pending", "approved", "rejected", "paused"].map((s) => `<button class="admin-filter ${s === "all" ? "active" : ""}" data-supplier-filter="${s}">${s === "all" ? "全部" : statusName[s]} (${s === "all" ? rows.length : rows.filter((x) => x.status === s).length})</button>`).join("");
  content.innerHTML = `<div class="admin-summary">${counts}</div><div id="supplierAdminRows"></div>`;
  const draw = (filter = "all") => {
    const list = filter === "all" ? rows : rows.filter((x) => x.status === filter);
    document.querySelector("#supplierAdminRows").innerHTML = list.map((x) => `<article class="admin-item"><div><div class="admin-title-row"><b>${esc(x.company_name)}</b><span class="status-badge status-${esc(x.status)}">${statusName[x.status] || esc(x.status)}</span>${x.featured ? '<span class="status-badge featured">推荐</span>' : ""}</div><p>${esc(x.category)} · ${esc(x.city)}</p><p>${esc(x.contact_name)} · ${esc(x.phone || x.whatsapp)}</p><p>${esc(x.products)}</p><div class="admin-gallery">${(x.image_urls || []).map((url, i) => `<figure><img src="${esc(url)}" alt="企业图片${i + 1}"><span>${i === 0 ? "主图" : i + 1}</span></figure>`).join("")}</div></div><div class="admin-item-actions"><button class="approve" onclick="supplierAct('${x.id}','approved')">通过</button><button onclick="supplierAct('${x.id}','pending')">待审</button><button class="reject" onclick="supplierAct('${x.id}','rejected')">驳回</button><button onclick="supplierAct('${x.id}','paused')">暂停</button><button onclick="supplierFeature('${x.id}',${!x.featured})">${x.featured ? "取消推荐" : "设为推荐"}</button><button class="approve" onclick="supplierImages('${x.id}')">管理图片</button><button class="reject" onclick="supplierDelete('${x.id}')">删除</button></div></article>`).join("") || '<div class="muted admin-empty">当前分类暂无供应商</div>';
  };
  document.querySelectorAll("[data-supplier-filter]").forEach((b) => b.addEventListener("click", () => { document.querySelectorAll("[data-supplier-filter]").forEach((x) => x.classList.toggle("active", x === b)); draw(b.dataset.supplierFilter); }));
  draw();
}
function hotelForm(h = {}) {
  const existing = (h.image_urls || [])
    .map(
      (url, i) =>
        `<figure><img src="${esc(url)}" alt="房型图片 ${i + 1}"><span>${i + 1}</span></figure>`,
    )
    .join("");
  return `<form class="hotel-admin-form" id="hotelAdminForm"><input type="hidden" name="id" value="${esc(h.id || "")}"><h3>${h.id ? "编辑酒店房型" : "新增酒店房型"}</h3><label>酒店/产品名称<input name="name" required value="${esc(h.name || "中鼎国际酒店")}"></label><label>房型名称<input name="room_type" required value="${esc(h.room_type || "")}" placeholder="标准双床房"></label><label>价格（美元）<input name="price" type="number" min="0" step="0.01" value="${esc(h.price || "")}"></label><label>计价单位<select name="price_unit"><option value="晚">每晚</option><option value="月">每月</option></select></label><label>可售房数<input name="rooms_available" type="number" min="0" value="${esc(h.rooms_available ?? 0)}"></label><label>状态<select name="status"><option value="draft">草稿</option><option value="published">发布</option><option value="paused">暂停</option></select></label><label class="full">设施（逗号分隔）<input name="facilities" value="${esc((h.facilities || []).join("，"))}" placeholder="WiFi，早餐，停车场"></label><label class="full image-upload-field">房型图片自动上传<input id="hotelImages" name="hotel_images" type="file" accept="image/jpeg,image/png,image/webp" multiple><small>可选1–10张，系统会自动压缩上传；下方图片网址可继续手动维护。</small><div id="hotelImagePreview" class="upload-preview">${existing}</div><div class="upload-progress" hidden><i></i></div></label><label class="full">图片网址（每行一个，最多10张）<textarea name="image_urls">${esc((h.image_urls || []).join("\n"))}</textarea></label><label class="full">房型介绍<textarea name="description">${esc(h.description || "")}</textarea></label><label class="check"><input name="featured" type="checkbox" ${h.featured ? "checked" : ""}> 首页推荐</label><div class="full hotel-form-actions"><button class="btn btn-primary">${h.id ? "保存修改" : "新增房型"}</button>${h.id ? '<button type="button" class="btn btn-dark" onclick="hotelCancelEdit()">取消编辑</button>' : ""}</div><div id="hotelFormMessage" class="form-message full"></div></form>`;
}
function wireHotelImagePreview(form) {
  const input = form.querySelector("#hotelImages");
  const preview = form.querySelector("#hotelImagePreview");
  input?.addEventListener("change", () => {
    const files = [...input.files].slice(0, 10);
    if (input.files.length > 10) {
      input.value = "";
      preview.innerHTML = '<span class="form-message bad">最多上传10张房型图片</span>';
      return;
    }
    preview.innerHTML = files
      .map(
        (file, i) =>
          `<figure><img src="${URL.createObjectURL(file)}" alt="房型预览 ${i + 1}"><span>${i + 1}</span></figure>`,
      )
      .join("");
  });
}
function renderHotels(rows) {
  content.innerHTML = hotelForm() + `<div class="admin-list hotel-list">${rows.map((h) => `<article class="admin-item"><div><div class="admin-title-row"><b>${esc(h.name)} · ${esc(h.room_type)}</b><span class="status-badge status-${esc(h.status)}">${statusName[h.status] || esc(h.status)}</span>${h.featured ? '<span class="status-badge featured">推荐</span>' : ""}</div><p>US$ ${esc(h.price)} / ${esc(h.price_unit)} · 可售 ${esc(h.rooms_available)} 间</p><p>${esc(h.description || "暂无介绍")}</p><div class="admin-gallery">${(h.image_urls || []).map((url, i) => `<img src="${esc(url)}" alt="酒店图片${i + 1}">`).join("")}</div></div><div class="admin-item-actions"><button class="approve" onclick="hotelEdit('${h.id}')">编辑</button><button class="reject" onclick="hotelDelete('${h.id}')">删除</button></div></article>`).join("") || '<div class="muted admin-empty">暂无酒店房型，请在上方新增</div>'}</div>`;
  const form = document.querySelector("#hotelAdminForm");
  form.addEventListener("submit", saveHotel);
  wireHotelImagePreview(form);
}
async function loadAdmin() {
  try {
    if (adminTab === "site-settings") {
      const j = await jsonFetch("/api/site-settings");
      login.hidden = true; dash.hidden = false; const s = j.data;
      content.innerHTML = `<form class="ai-settings-form" id="siteSettingsForm"><h3 class="full">首页视频与四平台咨询</h3><label>首页视频<select name="video_enabled"><option value="true" ${s.video_enabled ? "selected" : ""}>显示</option><option value="false" ${!s.video_enabled ? "selected" : ""}>隐藏</option></select></label><label>视频标题<input name="video_title" value="${esc(s.video_title)}"></label><label class="full">视频简介<textarea name="video_description">${esc(s.video_description)}</textarea></label><label class="full">宣传视频链接<input name="video_url" type="url" value="${esc(s.video_url)}" placeholder="YouTube 或可打开的视频链接"></label><label class="full">视频封面链接<input name="video_cover" value="${esc(s.video_cover)}"></label><label>视频号链接/二维码页<input name="wechat_channels_url" value="${esc(s.wechat_channels_url)}"></label><label>YouTube频道/视频<input name="youtube_url" value="${esc(s.youtube_url)}"></label><label>微信<input name="wechat" value="${esc(s.wechat)}"></label><label>Telegram<input name="telegram" value="${esc(s.telegram)}"></label><label>Messenger<input name="messenger" value="${esc(s.messenger)}"></label><label>WhatsApp<input name="whatsapp" value="${esc(s.whatsapp)}"></label><div class="full"><button class="btn btn-primary">保存设置</button></div><div id="siteSettingsMessage" class="form-message full"></div></form>`;
      document.querySelector("#siteSettingsForm").addEventListener("submit", saveSiteSettings);
      return;
    }
    if (adminTab === "ai-settings") {
      const j = await jsonFetch("/api/admin-ai-settings");
      login.hidden = true;
      dash.hidden = false;
      const s = j.data;
      content.innerHTML = `<form class="ai-settings-form" id="aiSettingsForm"><label>启用 AI 客服<select name="enabled"><option value="true" ${s.enabled ? "selected" : ""}>启用</option><option value="false" ${!s.enabled ? "selected" : ""}>停用（自动使用FAQ）</option></select></label><label>接口类型<select name="provider"><option value="openai" selected>OpenAI / 兼容接口</option></select></label><label class="full">API 接口地址<input name="base_url" type="url" required value="${esc(s.base_url)}" placeholder="https://api.openai.com/v1"></label><label>模型名称<input name="model" required value="${esc(s.model)}" placeholder="gpt-5-mini"></label><label>API Key<input name="api_key" type="password" placeholder="${s.has_api_key ? "已安全保存，留空不修改" : "请输入 API Key"}"></label><label class="full">客服指令<textarea name="system_prompt" placeholder="设置客服身份、酒店价格、服务范围和回答规则">${esc(s.system_prompt)}</textarea></label><div class="full settings-note">API Key 仅加密保存在服务器，不会返回浏览器。建议先保存，再点击测试连接。</div><div class="full ai-setting-actions"><button class="btn btn-primary">保存设置</button><button class="btn btn-dark" type="button" id="testAIConnection">测试连接</button></div><div id="aiSettingsMessage" class="form-message full"></div></form>`;
      document
        .querySelector("#aiSettingsForm")
        .addEventListener("submit", saveAISettings);
      document.querySelector("#testAIConnection").addEventListener("click", testAIConnection);
      return;
    }
    const j = await jsonFetch("/api/admin-data?type=" + adminTab);
    login.hidden = true;
    dash.hidden = false;
    adminRows = j.data || [];
    if (adminTab === "suppliers") return renderSupplierAdmin(adminRows);
    if (adminTab === "hotels") return renderHotels(adminRows);
    if (adminTab === "bookings") {
      const bookingStatusName = { pending_contact: "待联系", contacted: "已联系", quoted: "已报价", confirmed: "已确认", checked_in: "已入住", cancelled: "已取消", new: "待联系" };
      content.innerHTML =
        adminRows
          .map(
            (x) =>
              `<article class="admin-item booking-lead"><div><div class="admin-title-row"><b>${esc(x.order_no)} · ${esc(x.customer_name)}</b><span class="status-badge status-${esc(x.status)}">${bookingStatusName[x.status] || esc(x.status)}</span></div><p>${esc(x.country_region || "地区未填")} · ${esc(x.room_type)} · ${esc(x.checkin)} 至 ${esc(x.checkout)} · ${esc(x.rooms)} · ${esc(x.guests)}</p><p>电话：${esc(x.contact)}　微信：${esc(x.wechat)}　Telegram：${esc(x.telegram)}　Messenger：${esc(x.messenger)}　WhatsApp：${esc(x.whatsapp)}</p><p>${esc(x.stay_purpose)} · ${esc(x.transfer_need)} · 来源：${esc(x.source || "website")}</p><p>${esc(x.note || "无备注")}</p><label>跟进备注<textarea id="follow-${x.id}">${esc(x.follow_up_note || "")}</textarea></label></div><div class="admin-item-actions"><select id="status-${x.id}">${Object.entries(bookingStatusName).filter(([k]) => k !== "new").map(([k,v]) => `<option value="${k}" ${x.status === k ? "selected" : ""}>${v}</option>`).join("")}</select><button class="approve" onclick="bookingSave('${x.id}')">保存跟进</button></div></article>`,
          )
          .join("") || '<div class="muted">暂无在线订单</div>';
      return;
    }
    content.innerHTML = adminRows
        .map((x) =>
          `<article class="admin-item"><div><b>${esc(x.customer_name)} · ${esc(x.company_name)}</b><p>${esc(x.category)} · 预算 ${esc(x.budget)}</p><p>${esc(x.phone || x.whatsapp)}</p><p>${esc(x.requirements)}</p><p>${esc(x.delivery_time)}</p></div></article>`,
        )
        .join("") || '<div class="muted">暂无数据</div>';
  } catch (e) {
    login.hidden = false;
    dash.hidden = true;
  }
}
async function saveSiteSettings(e) {
  e.preventDefault(); const form = e.currentTarget, msg = document.querySelector("#siteSettingsMessage");
  const data = Object.fromEntries(new FormData(form).entries()); data.video_enabled = data.video_enabled === "true";
  try { const j = await jsonFetch("/api/site-settings", { method: "PUT", body: JSON.stringify(data) }); msg.textContent = j.message; msg.className = "form-message full ok"; }
  catch (err) { msg.textContent = err.message; msg.className = "form-message full bad"; }
}
window.bookingSave = async (id) => {
  const status = document.querySelector(`#status-${id}`).value;
  const follow_up_note = document.querySelector(`#follow-${id}`).value;
  const j = await jsonFetch(`/api/admin-data?type=bookings&id=${id}`, { method: "PATCH", body: JSON.stringify({ status, follow_up_note }) });
  showToast(j.message); loadAdmin();
};
async function testAIConnection() {
  const form = document.querySelector("#aiSettingsForm"), msg = document.querySelector("#aiSettingsMessage"), data = Object.fromEntries(new FormData(form).entries());
  msg.textContent = "正在测试接口……";
  try { const j = await jsonFetch("/api/admin-ai-settings", { method: "POST", body: JSON.stringify(data) }); msg.textContent = j.message; msg.className = "form-message full ok"; }
  catch (err) { msg.textContent = err.message; msg.className = "form-message full bad"; }
}
async function saveHotel(e) {
  e.preventDefault();
  const form = e.currentTarget,
    data = Object.fromEntries(new FormData(form).entries()),
    id = data.id,
    msg = document.querySelector("#hotelFormMessage"),
    fileInput = form.querySelector("#hotelImages"),
    progress = form.querySelector(".upload-progress"),
    bar = progress?.querySelector("i");
  data.featured = form.featured.checked;
  delete data.id;
  delete data.hotel_images;
  try {
    const files = [...(fileInput?.files || [])].slice(0, 10);
    if (files.length) {
      const uploadedUrls = [];
      progress.hidden = false;
      for (let i = 0; i < files.length; i++) {
        msg.textContent = `正在上传房型图片 ${i + 1}/${files.length}……`;
        msg.className = "form-message full";
        const image = await compressImage(files[i]);
        const uploaded = await jsonFetch("/api/supplier-image", {
          method: "POST",
          body: JSON.stringify({ data: image, kind: "hotel" }),
        });
        uploadedUrls.push(uploaded.url);
        if (bar) bar.style.width = `${Math.round(((i + 1) / files.length) * 100)}%`;
      }
      const manualUrls = String(data.image_urls || "")
        .split(/[\n,]/)
        .map((x) => x.trim())
        .filter(Boolean);
      data.image_urls = [...uploadedUrls, ...manualUrls].slice(0, 10);
    }
    await jsonFetch("/api/admin-hotel" + (id ? `?id=${id}` : ""), {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify(data),
    });
    await loadAdmin();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "form-message full bad";
  } finally {
    if (progress) progress.hidden = true;
    if (bar) bar.style.width = "0";
  }
}
window.hotelEdit = (id) => { const h = adminRows.find((x) => x.id === id); if (!h) return; const old = document.querySelector("#hotelAdminForm"); old.outerHTML = hotelForm(h); const form = document.querySelector("#hotelAdminForm"); form.status.value = h.status; form.price_unit.value = h.price_unit; form.addEventListener("submit", saveHotel); wireHotelImagePreview(form); scrollTo({ top: form.offsetTop - 90, behavior: "smooth" }); };
window.hotelCancelEdit = () => loadAdmin();
window.hotelDelete = async (id) => { if (!confirm("确定删除该酒店房型吗？此操作不能恢复。")) return; await jsonFetch(`/api/admin-hotel?id=${id}`, { method: "DELETE" }); loadAdmin(); };
async function saveAISettings(e) {
  e.preventDefault();
  const form = e.currentTarget,
    msg = document.querySelector("#aiSettingsMessage"),
    data = Object.fromEntries(new FormData(form).entries());
  data.enabled = data.enabled === "true";
  msg.textContent = "正在保存……";
  try {
    const j = await jsonFetch("/api/admin-ai-settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    msg.textContent = j.message;
    msg.className = "form-message full ok";
    form.api_key.value = "";
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "form-message full bad";
  }
}
login?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await jsonFetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(login).entries())),
    });
    loadAdmin();
  } catch (err) {
    document.querySelector("#adminLoginMessage").textContent = err.message;
  }
});
document.querySelectorAll("[data-tab]").forEach((b) =>
  b.addEventListener("click", () => {
    adminTab = b.dataset.tab;
    document
      .querySelectorAll("[data-tab]")
      .forEach((x) => x.classList.toggle("active", x === b));
    loadAdmin();
  }),
);
document.querySelector("#adminLogout")?.addEventListener("click", () => {
  jsonFetch("/api/admin-login?action=logout", { method: "POST" }).finally(() =>
    location.reload(),
  );
});
window.supplierAct = async (id, status) => {
  const j = await jsonFetch("/api/admin-supplier?id=" + id, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  showToast(j.message || "操作成功");
  loadAdmin();
};
window.supplierFeature = async (id, featured) => {
  const j = await jsonFetch("/api/admin-supplier?id=" + id, {
    method: "PATCH",
    body: JSON.stringify({ featured }),
  });
  showToast(j.message || "操作成功");
  loadAdmin();
};
window.supplierDelete = async (id) => {
  if (confirm("确定删除该供应商吗？")) {
    await jsonFetch("/api/admin-supplier?id=" + id, { method: "DELETE" });
    loadAdmin();
  }
};
if (login) loadAdmin();
loadSuppliers();

// V6.0 supplier share and poster
function supplierShareData(s) {
  const url = `${location.origin}/api/supplier-share?id=${encodeURIComponent(s.id || "")}`;
  const text = `${s.company_name || "供应商"}\n联系人：${s.contact_name || ""}\n电话：${s.phone || s.whatsapp || ""}\n地址：${s.address || s.city || "柬埔寨"}\n${s.products || s.description || ""}`;
  return { url, text };
}

window.supplierImages = (id) => {
  const supplier = adminRows.find((row) => String(row.id) === String(id));
  if (!supplier) return;
  let images = Array.isArray(supplier.image_urls) ? supplier.image_urls.filter(Boolean).slice(0, 10) : [];
  const modal = ensureSupplierModal();
  const draw = () => {
    modal.querySelector("#supplierModalContent").innerHTML = `<form class="supplier-image-manager" id="supplierImageManager"><span class="eyebrow">供应商图片管理</span><h3>${esc(supplier.company_name)}</h3><p>第一张为公司主图，可调整排序、删除或新增；发布状态建议保留4—10张。</p><div class="supplier-manage-grid">${images.map((url, i) => `<figure><img src="${esc(url)}" alt="企业图片${i + 1}"><figcaption>${i === 0 ? "公司主图" : `第 ${i + 1} 张`}</figcaption><div><button type="button" data-up="${i}" ${i === 0 ? "disabled" : ""}>←</button><button type="button" data-down="${i}" ${i === images.length - 1 ? "disabled" : ""}>→</button><button type="button" class="danger" data-remove="${i}">删除</button></div></figure>`).join("") || '<p class="muted">暂无图片</p>'}</div><label class="image-upload-field">增加图片<input id="supplierAdminImages" type="file" accept="image/jpeg,image/png,image/webp" multiple><small>最多增加到10张，系统自动压缩。</small></label><div class="actions"><button class="btn btn-primary" type="submit">保存图片与排序</button><button class="btn btn-dark" type="button" data-close-manager>取消</button></div><div class="form-message" id="supplierImageMessage"></div></form>`;
    const form = modal.querySelector("#supplierImageManager");
    form.querySelectorAll("[data-up]").forEach((button) => button.onclick = () => { const i = Number(button.dataset.up); [images[i - 1], images[i]] = [images[i], images[i - 1]]; draw(); });
    form.querySelectorAll("[data-down]").forEach((button) => button.onclick = () => { const i = Number(button.dataset.down); [images[i + 1], images[i]] = [images[i], images[i + 1]]; draw(); });
    form.querySelectorAll("[data-remove]").forEach((button) => button.onclick = () => { if (confirm("确定删除这张图片吗？保存后生效。")) { images.splice(Number(button.dataset.remove), 1); draw(); } });
    form.querySelector("[data-close-manager]").onclick = () => modal.classList.remove("open");
    form.onsubmit = async (event) => {
      event.preventDefault();
      const msg = form.querySelector("#supplierImageMessage");
      try {
        const files = [...form.querySelector("#supplierAdminImages").files];
        if (images.length + files.length > 10) throw new Error("每家供应商最多10张图片");
        for (let i = 0; i < files.length; i++) {
          msg.textContent = `正在上传 ${i + 1}/${files.length}……`;
          const uploaded = await jsonFetch("/api/supplier-image", { method: "POST", body: JSON.stringify({ data: await compressImage(files[i]), kind: "supplier-admin" }) });
          images.push(uploaded.url);
        }
        if (supplier.status === "approved" && images.length < 4) throw new Error("已发布供应商至少保留4张图片");
        await jsonFetch(`/api/admin-supplier?id=${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ image_urls: images }) });
        modal.classList.remove("open");
        showToast("供应商图片已更新");
        loadAdmin();
      } catch (error) { msg.textContent = error.message; msg.className = "form-message bad"; }
    };
  };
  draw();
  modal.classList.add("open");
};

function ensureSupplierModal() {
  let modal = document.querySelector("#supplierModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "supplierModal";
  modal.className = "supplier-modal";
  modal.innerHTML = '<div class="supplier-modal-backdrop" data-close-supplier-modal></div><section class="supplier-modal-panel" role="dialog" aria-modal="true"><button class="supplier-modal-close" type="button" data-close-supplier-modal aria-label="关闭">×</button><div id="supplierModalContent"></div></section>';
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close-supplier-modal]").forEach((el) => el.addEventListener("click", () => modal.classList.remove("open")));
  return modal;
}

window.openSupplierGallery = (raw, start = 0) => {
  const s = JSON.parse(raw);
  const images = Array.isArray(s.image_urls) ? s.image_urls.filter(Boolean) : [];
  if (!images.length) return;
  let active = Math.max(0, Math.min(start, images.length - 1));
  const modal = ensureSupplierModal();
  const draw = () => {
    modal.querySelector("#supplierModalContent").innerHTML = `<div class="supplier-lightbox"><div class="supplier-lightbox-stage"><img src="${esc(images[active])}" alt="${esc(s.company_name)} 图片 ${active + 1}">${images.length > 1 ? '<button type="button" class="gallery-prev" aria-label="上一张">‹</button><button type="button" class="gallery-next" aria-label="下一张">›</button>' : ""}</div><div class="supplier-lightbox-caption"><b>${esc(s.company_name)}</b><span>${active + 1} / ${images.length}</span></div><div class="supplier-thumbs">${images.map((url, i) => `<button type="button" class="${i === active ? "active" : ""}" data-gallery-index="${i}"><img src="${esc(url)}" alt="缩略图 ${i + 1}"></button>`).join("")}</div></div>`;
    modal.querySelector(".gallery-prev")?.addEventListener("click", () => { active = (active - 1 + images.length) % images.length; draw(); });
    modal.querySelector(".gallery-next")?.addEventListener("click", () => { active = (active + 1) % images.length; draw(); });
    modal.querySelectorAll("[data-gallery-index]").forEach((button) => button.addEventListener("click", () => { active = Number(button.dataset.galleryIndex); draw(); }));
  };
  draw();
  modal.classList.add("open");
};

window.openSupplierShare = (raw) => {
  const s = JSON.parse(raw);
  const { url, text } = supplierShareData(s);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const modal = ensureSupplierModal();
  modal.querySelector("#supplierModalContent").innerHTML = `<div class="supplier-share-panel"><span class="eyebrow">分享企业名片</span><h3>${esc(s.company_name)}</h3><p>将公司资料分享到柬埔寨常用社交平台，或复制链接发给客户。</p><div class="supplier-platforms"><a target="_blank" rel="noopener" href="https://wa.me/?text=${encodedText}%0A${encodedUrl}">WhatsApp</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}">Facebook</a><a target="_blank" rel="noopener" href="https://t.me/share/url?url=${encodedUrl}&text=${encodedText}">Telegram</a><button type="button" id="copySupplierLink">复制链接</button></div></div>`;
  modal.querySelector("#copySupplierLink").addEventListener("click", async () => {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    showToast("企业资料及链接已复制");
  });
  modal.classList.add("open");
};

window.shareSupplier = async (raw) => {
  const s = JSON.parse(raw);
  const url = `${location.origin}/api/supplier-share?id=${encodeURIComponent(s.id || "")}`;
  const text = `${s.company_name}\n分类：${s.category}\n主营：${s.products || s.description || ""}\n来自中鼎供应链平台`;
  try {
    if (navigator.share)
      await navigator.share({ title: s.company_name, text, url });
    else {
      await navigator.clipboard.writeText(text + "\n" + url);
      showToast("供应商资料已复制");
    }
  } catch (e) {
    if (e.name !== "AbortError") showToast("分享未完成");
  }
};
function loadPosterImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
function drawCoverImage(c, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  c.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}
window.createSupplierPoster = async (raw) => {
  const s = JSON.parse(raw);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const c = canvas.getContext("2d");
  const g = c.createLinearGradient(0, 0, 1080, 1440);
  g.addColorStop(0, "#081a31");
  g.addColorStop(1, "#173f68");
  c.fillStyle = g;
  c.fillRect(0, 0, 1080, 1440);
  c.fillStyle = "#caa45e";
  c.fillRect(70, 70, 940, 12);
  c.font = "bold 34px Arial";
  c.fillText("ZIEC SUPPLY CHAIN", 80, 145);
  const mainImageUrl = Array.isArray(s.image_urls) ? s.image_urls.filter(Boolean)[0] : "";
  c.fillStyle = "rgba(255,255,255,.10)";
  c.fillRect(70, 185, 940, 400);
  if (mainImageUrl) {
    try {
      const mainImage = await loadPosterImage(mainImageUrl);
      c.save();
      c.beginPath();
      c.roundRect(70, 185, 940, 400, 18);
      c.clip();
      drawCoverImage(c, mainImage, 70, 185, 940, 400);
      c.restore();
    } catch (_) {
      c.fillStyle = "rgba(255,255,255,.7)";
      c.font = "28px Arial";
      c.fillText("企业推荐主图", 430, 395);
    }
  }
  c.fillStyle = "#fff";
  c.font = "bold 54px Arial";
  wrapCanvas(c, s.company_name, 80, 665, 900, 64);
  c.fillStyle = "#e5c98d";
  c.font = "bold 32px Arial";
  c.fillText(s.category || "企业供应商", 80, 745);
  c.fillStyle = "#fff";
  c.font = "26px Arial";
  wrapCanvas(
    c,
    s.slogan ||
      s.products ||
      s.description ||
      "链接柬埔寨优质供应链，服务企业真实需求",
    80,
    795,
    900,
    38,
  );
  c.fillStyle = "rgba(255,255,255,.12)";
  c.fillRect(70, 895, 650, 250);
  c.fillStyle = "#fff";
  c.font = "27px Arial";
  c.fillText(`城市：${s.city || "柬埔寨"}`, 105, 955);
  c.fillText(`联系人：${s.contact_name || "平台客服"}`, 105, 1015);
  c.fillText(`电话：${s.phone || s.whatsapp || "待补充"}`, 105, 1075);
  c.fillStyle = "#e5c98d";
  c.font = "bold 21px Arial";
  c.fillText("微信 · Telegram · Messenger · WhatsApp", 105, 1120);
  try {
    const qr = await loadPosterImage("./assets/website-qr.png");
    c.fillStyle = "#fff";
    c.fillRect(770, 895, 240, 250);
    c.drawImage(qr, 790, 915, 200, 200);
  } catch (_) {}
  c.fillStyle = "#caa45e";
  c.font = "bold 30px Arial";
  c.fillText("www.ziechotel.top", 80, 1265);
  c.fillStyle = "#fff";
  c.font = "24px Arial";
  c.fillText("扫码查看企业资料 · 中鼎供应链平台", 80, 1310);
  c.fillStyle = "rgba(255,255,255,.72)";
  c.font = "20px Arial";
  c.fillText("企业资料以平台审核信息为准", 80, 1350);
  const a = document.createElement("a");
  a.download = `${s.company_name || "供应商"}-中鼎供应链海报.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
  showToast("供应商海报已生成");
};
function wrapCanvas(c, text, x, y, max, line) {
  let row = "",
    yy = y;
  for (const ch of String(text || "")) {
    const test = row + ch;
    if (c.measureText(test).width > max && row) {
      c.fillText(row, x, yy);
      row = ch;
      yy += line;
    } else row = test;
  }
  if (row) c.fillText(row, x, yy);
}

// V6.0 AI customer service
const aiPanel = document.querySelector("#aiPanel"),
  aiMessages = document.querySelector("#aiMessages"),
  aiForm = document.querySelector("#aiForm"),
  aiInput = document.querySelector("#aiInput");
function openAI() {
  if (!aiPanel) return;
  aiPanel.classList.add("open");
  aiPanel.setAttribute("aria-hidden", "false");
  setTimeout(() => aiInput?.focus(), 100);
}
function closeAI() {
  aiPanel?.classList.remove("open");
  aiPanel?.setAttribute("aria-hidden", "true");
}
function aiMessage(text, kind = "bot") {
  const d = document.createElement("div");
  d.className = "ai-message " + kind;
  d.textContent = text;
  aiMessages?.appendChild(d);
  if (aiMessages) aiMessages.scrollTop = aiMessages.scrollHeight;
  return d;
}
document
  .querySelectorAll("[data-ai-open]")
  .forEach((b) => b.addEventListener("click", openAI));
document
  .querySelectorAll("[data-ai-close]")
  .forEach((b) => b.addEventListener("click", closeAI));
document.querySelectorAll("[data-ai-question]").forEach((b) =>
  b.addEventListener("click", () => {
    openAI();
    askAI(b.dataset.aiQuestion);
  }),
);
async function askAI(q) {
  if (!q) return;
  aiMessage(q, "user");
  const wait = aiMessage("正在为您查询…", "bot waiting");
  try {
    const j = await jsonFetch("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({ message: q }),
    });
    wait.textContent = j.answer || "暂时无法回答，请联系人工客服。";
    wait.classList.remove("waiting");
  } catch (e) {
    wait.textContent = "AI客服暂时繁忙，请联系 WhatsApp：+855 018 995 8899";
    wait.classList.remove("waiting");
  }
}
aiForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = aiInput.value.trim();
  if (!q) return;
  aiInput.value = "";
  askAI(q);
});
