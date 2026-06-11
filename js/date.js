// Graduation: May 1, 2026. Counts down before, counts up after.
var gradDate = new Date(2026, 4, 1, 0, 0, 0);

// Add n months, clamping the day (Jan 31 + 1mo = Feb 28, not Mar 3)
function addMonthsClamped(d, n) {
  var r = new Date(d);
  var day = r.getDate();
  r.setDate(1);
  r.setMonth(r.getMonth() + n);
  var maxDay = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(day, maxDay));
  return r;
}

function calendarDiff(from, to) {
  var months = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth();
  if (addMonthsClamped(from, months) > to) months--;
  var ms = to - addMonthsClamped(from, months);
  return {
    years: Math.floor(months / 12),
    months: months % 12,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function updateGradClock() {
  var now = new Date();
  var graduated = now >= gradDate;
  var d = graduated ? calendarDiff(gradDate, now) : calendarDiff(now, gradDate);

  var title = document.getElementById("gradTitle");
  if (title) {
    title.innerHTML = graduated ? "Graduated 🎓 Time Since:" : "Days Until Graduation ⌛";
  }

  document.getElementById("year").innerHTML = d.years;
  document.getElementById("month").innerHTML = d.months;
  document.getElementById("day").innerHTML = d.days;
  document.getElementById("hour").innerHTML = d.hours;
  document.getElementById("minute").innerHTML = d.minutes;
  document.getElementById("second").innerHTML = d.seconds;
}

updateGradClock();
setInterval(updateGradClock, 1000);
