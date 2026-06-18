刷公众号的时候,看到一篇不错的文章,想收藏。

点击右上角,收藏。

下次想看的时候,打开收藏夹,找到那篇文章,点开链接,重新加载。

**收藏的只是一个链接,而且也不知道文章的具体内容，下次找的时候根本找不到。**

但是如果我想把文章保存到Obsidian知识库里,就更麻烦了:

1. 复制标题
    
2. 复制正文
    
3. 下载图片
    
4. 插入图片到对应位置
    
5. 创建文件
    
6. 填写frontmatter
    
7. 保存
    

**7个步骤,至少5分钟。**

这个步骤真是太麻烦。所以很多觉得好的文章都堆在微信收藏夹里了,再也不看。

我的微信收藏夹里躺着300多篇文章,但是90%都没再打开过。

---

## 我的解决方案:两步走

### 第一步:创建一个Claude Skill

我写了一个"公众号一键存档"Skill,核心功能:

**输入:**一个公众号文章链接  
**输出:**自动保存到Obsidian,包含:

- 标题、作者、发布时间
    
- 完整正文(图片保留在原位置)
    
- 自动生成的阅读笔记(核心观点、金句摘录)
    

**技术实现的3个关键点:**

#### 1. 绕过微信反爬机制

微信公众号有反爬机制,直接抓取会失败。

我用微信客户端的User-Agent伪装请求:

  

`WECHAT_UA ="Mozilla/5.0 (Linux; Android 13; V2148A) AppleWebKit/537.36 Chrome/116.0.0.0 Mobile Safari/537.36 MicroMessenger/8.0.49.2600"      result_proc = subprocess.run(   ["curl","-s","-L","-A", WECHAT_UA, url],       capture_output=True,       text=True,       timeout=30,   )   `

然后用正则表达式提取标题、作者、正文、图片链接。

#### 2. 图片位置保留(最关键)

一般的抓取脚本,会把所有HTML标签都去掉,图片也就丢了。

我的做法是:**先把`<img>`标签转成Markdown格式,再去掉其他HTML标签。**

  

`defreplace_img_tag(match):       img_tag =match.group(0)       src_match = re.search(r'(?:data-src|src)="([^"]+)"', img_tag)   if src_match:           img_url = src_match.group(1).replace("&amp;","&")   returnf"\n\n![图片]({img_url})\n\n"   return""      # 先转换图片   content = re.sub(r'<img[^>]*>', replace_img_tag, html_content)      # 再去掉其他HTML标签   content = re.sub(r'<[^>]+>','', content)   `

这样,图片就会出现在原文对应的位置,而不是全部堆在文章末尾。

#### 3. 自动生成阅读笔记

保存文章后,Claude会基于文章内容自动生成:

- **核心观点**(3条):提取文章的主要论点
    
- **关键信息**:重要数据、案例、方法论
    
- **金句摘录**(3句):可传播的精彩表达
    
- **思考/迭代点**:从我的视角思考启发和应用场景
    

这样,每篇文章保存后,不是一个空模板,而是已经有了初步的总结。

---

![2026年5月24日-微信收藏夹躺着300篇文章-1779601606811.png](https://mmbiz.qpic.cn/sz_mmbiz_png/DIicIQu9J52A995JiaEm3ub3XIoVKxQdA1BxJPFg9Q8JTBlTOtXZeuAyvwcOxbFGnQDcvfxHehicibpL5eap6Azmcn43ghCYr6ibiaWzMamiaqibicqs/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=0)

### 第二步:用qclaw搭建自动化系统

有了Skill,还需要一个触发机制。

我用的是**qclaw**之前写文章的时候也聊过，使用这个搭建自己的一个云端的内容创作系统，然后配合这个Skill,搭建了一个自动化系统。

**完整流程:**

  

`发现好的公众号文章     ↓   发消息给我本地的qclaw     ↓   qclaw调用"公众号一键存档"Skill     ↓   自动抓取文章内容(标题、作者、正文、图片)     ↓   图片自动插入到原文对应位置     ↓   自动生成阅读笔记(核心观点、关键信息、金句摘录)     ↓   保存到Obsidian指定目录     ↓   返回:✅ 已保存到 [[文章路径]]   `

**现在,我看到好文章,直接把链接发给qclaw:**

  

`https://mp.weixin.qq.com/s/L1ISA0FvxY_7OR994RttWw   `

qclaw自动执行:

1. 抓取文章内容
    
2. 生成文件路径:`03.参考资料库/公众号文章/2026年/数字生命卡兹克/2026年5月24日-分享一个很实用的寓言故事prompt.md`
    
3. 生成Markdown文件(包含frontmatter、正文、阅读笔记)
    
4. 保存到Obsidian
    
5. 返回可点击的wikilink:`[[03.参考资料库/公众号文章/2026年/数字生命卡兹克/2026年5月24日-分享一个很实用的寓言故事prompt.md]]`
    

**整个过程不到10秒。**  
![2026年5月24日-微信收藏夹躺着300篇文章-1779601636742.png](https://mmbiz.qpic.cn/mmbiz_png/DIicIQu9J52DbZ0x8s7XFgVnTduVGQQta9lco0LrhKQpLiamjLKibECahyv2NwA8SnHdWRwmBbGLOmJxnIbnk8wIeyRES5ge8MsUVoExYmRtn0/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=1)

---

用了这个方案之后，我的收藏习惯彻底变了。

以前那300多篇躺在微信收藏夹里的文章，想找的时候根本翻不到，基本也不会再看第二次。

现在看到好文章，直接把链接发给qclaw，它自动保存到Obsidian，按年份和公众号分好类。图片还在原来的位置，阅读体验跟看原文一模一样。更爽的是，每篇文章都自动生成了阅读笔记，核心观点、金句摘录，一目了然。

在Obsidian里搜一下，秒找到。

**最重要的是，这些文章真的会被我再次翻出来看。**

因为它们不是躺在收藏夹里的「死文章」，而是我知识库的一部分，可以搜索、可以关联、可以引用。

---

说到这个，可能有朋友会问，市面上不是有一些微信同步Obsidian的插件吗？为啥还要自己搞？

我确实试过几个。

**Messager插件**，安装简单，同步速度也快，但免费版每天只能同步10条，而且文章在服务器只保留1天，超过1天就没了。最关键的是，文章内容要传到第三方服务器，我有点不放心。

**笔记同步助手**，不限次数，还支持企业微信，看起来挺好。但需要手动安装插件，对新手不太友好，而且文章内容还是要经过第三方服务器。万一哪天服务挂了，就没法用了。

我自己这个方案，完全本地运行，数据不出库。图片保留在原文位置，永久有效。还能自动生成阅读笔记。最重要的是，完全免费，想怎么改就怎么改，不依赖任何第三方服务。

---

这个方案的核心，其实不是技术有多复杂。

而是把麻烦降到了最低。

以前保存一篇公众号文章到Obsidian，要7个步骤，至少5分钟。现在就一个动作，发链接给qclaw。

**麻烦少了，行动就多了。**

我现在每天都会保存好几篇文章到Obsidian，因为实在太简单了。而这些文章，真的会被我再次翻出来看，因为它们已经是我知识库的一部分。

---

今天的分享就到这里。

如果你也在用Obsidian做知识管理，对这个「公众号一键存档」Skill感兴趣，可以私信我