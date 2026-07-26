
const toast=document.querySelector('.toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
async function sharePage(button){
  const url=button.dataset.url||location.href;
  const title=button.dataset.title||document.title;
  const text=button.dataset.text||title;
  try{
    if(navigator.share){await navigator.share({title,text,url})}
    else{await navigator.clipboard.writeText(url);showToast('链接已复制')}
  }catch(e){if(e.name!=='AbortError')showToast('分享未完成')}
}
async function copyLink(button){
  const url=button.dataset.url||location.href;
  try{await navigator.clipboard.writeText(url);showToast('链接已复制')}
  catch(e){showToast('复制失败，请手动复制')}
}
document.querySelectorAll('[data-share]').forEach(b=>b.addEventListener('click',()=>sharePage(b)));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyLink(b)));
