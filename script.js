const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const whatsappLink=document.getElementById('whatsappLink');
whatsappLink.addEventListener('click',(e)=>{
  const phone='';
  const message=encodeURIComponent('Hola CapiNova, me gustaría solicitar una cotización.');
  if(!phone){
    e.preventDefault();
    alert('Agregaremos tu número de WhatsApp cuando me lo pases.');
    return;
  }
  whatsappLink.href='https://wa.me/'+phone+'?text='+message;
});

const emailLink=document.getElementById('emailLink');
emailLink.addEventListener('click',(e)=>{
  if(emailLink.getAttribute('href')==='mailto:'){
    e.preventDefault();
    alert('Agregaremos tu correo de contacto cuando me lo pases.');
  }
});
