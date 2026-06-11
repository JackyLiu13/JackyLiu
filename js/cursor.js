// Cursor star trail. Skipped on touch devices and when reduced motion is preferred.
(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.id = "cursor-canvas";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  // palette pulled from the site's gradients
  var colors = ["#88bf91", "#598392", "#c7a9d6", "#88bbbf", "#eeeeee"];

  var particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Trace a 5-pointed star centred at (0,0) into the current path.
  function starPath(radius) {
    var spikes = 5;
    var inner = radius * 0.45;
    var step = Math.PI / spikes;
    ctx.beginPath();
    for (var i = 0; i < spikes * 2; i++) {
      var r = i % 2 === 0 ? radius : inner;
      var a = i * step - Math.PI / 2;
      var x = Math.cos(a) * r;
      var y = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  window.addEventListener("mousemove", function (e) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.3,
      size: Math.random() * 6 + 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    if (particles.length > 120) {
      particles.splice(0, particles.length - 120);
    }
  });

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // gentle gravity
      p.angle += p.spin;
      p.life -= 0.02;
      p.size *= 0.985;

      if (p.life <= 0 || p.size < 0.5) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.life * 0.9;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      starPath(p.size);
      ctx.fill();
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
