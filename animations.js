var tl = new TimelineMax(),
    menu = document.querySelectorAll(".menu-wrapper"),
    title = document.querySelectorAll(".title"),
    itemsContainer = document.getElementById("itemsContainer"),
    svg = document.getElementById('menu'),
    items = svg.querySelectorAll('.item'),
    trigger = document.getElementById('trigger'),
    triggerWrapper = document.querySelectorAll('#trigger'),
    label = trigger.querySelectorAll('#label')[0],
    open = false,
    angle = 35;

tl.staggerFrom(menu, 5, {
  y: 50,
  ease: Elastic.easeOut.config(4, 0.3)
}, 0.1)
Draggable.create(title, {
  bounds: window,
  type: "x,y",
  edgeResistance: 20,
  throwProps: true
})

var tlLite = new TimelineLite();
for(var i=0; i<items.length; i++){
  tlLite.to(items[i], 0.3, {rotation: 0}, 0.05);
}
tlLite.to(items, .3, {scale:0}, 0.3);

trigger.addEventListener('click', toggleMenu, false);

function toggleMenu(event) {
  itemsContainer.classList.remove('hide')
  if (!event) var event = window.event;
  event.stopPropagation();
  open = !open;
  if (open) {
    var tl = new TimelineLite();
    tl.to(triggerWrapper, 2, {y: -40, ease: Elastic.easeOut.config(4, 0.7)}, 0.05);
    tl.to(items, 0.2, {scale:1, ease:Back.easeOut.config(4)}, 0.05);
    for(var i=0; i<items.length; i++){
      tl.to(items[i], 0.7, {rotation:-i*angle-16 + "deg", ease:Bounce.easeOut}, 0.35);
    }
    label.innerHTML = "-";
    svg.style.pointerEvents = "auto";
  } else {
    var tl = new TimelineLite();
    for(var i=0; i<items.length; i++){
      tl.to(items[i], 0.3, {rotation: 0, ease:Circ.easeOut}, 0.05);
    }
    tl.to(items, .3, {scale:0, ease:Back.easeIn}, 0.3);
    label.innerHTML = "+";
    svg.style.pointerEvents = "none";
    tl.to(triggerWrapper, 2, {y: 0, ease: Elastic.easeOut.config(2, 0.7)}, 0.05);
  }
}

svg.onclick = function (e) {
    e.stopPropagation();
}
