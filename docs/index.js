"use strict";
function mylog(Z) {
  try {
    postRaw("https://plau.trueslow.com/api/event", {
      name: Z,
      url: window.location.href,
      domain: "painthua.com"
    });
  } catch (h) {}
}
console.img = function (Z) {
  var h = new Image();
  h.onload = function () {
    console.log("%c ", "font-size:1px;padding: 64px 64px;background:url(" + Z + ") no-repeat;background-size:contain;");
  };
  h.src = Z;
};
window.max = Math.max;
window.min = Math.min;
window.abs = Math.abs;
window.round = Math.round;
window.floor = Math.floor;
window.ceil = Math.ceil;
window.pow = Math.pow;
window.sqrt = Math.sqrt;
window.sign = Math.sign;
window.postRaw = function (Z, h) {
  return fetch(Z, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(h)
  });
};
window.post = function (Z, h) {
  return fetch(Z, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(h)
  }).then(w => w.json());
};
window.gget = function (Z) {
  return fetch(Z, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(h => h.json());
};
function stringify(Z) {
  return JSON.stringify(Z, null, 1).replaceAll("\n ", "\n").trim();
}
function getYMDHMS() {
  var Z = new Date();
  var h = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var w = h[Z.getMonth()];
  var v = Z.getDate();
  var l = Z.getHours();
  var g = Z.getMinutes();
  var x = Z.getSeconds();
  return Z.getFullYear() + "-" + w + "-" + (v > 9 ? "" : "0") + v + " " + [(l > 9 ? "" : "0") + l, (g > 9 ? "" : "0") + g, (x > 9 ? "" : "0") + x].join(":");
}
function $(Z) {
  return document.querySelector(Z);
}
function $c(Z) {
  Z = typeof Z === "string" ? $(Z) : Z;
  return Z.classList;
}
$.parse = function (Z) {
  return Z.replaceAll("L🖱️", "<img src=\"img/mouse_left.svg\" class=\"icon\">").replaceAll("R🖱️", "<img src=\"img/mouse_right.svg\" class=\"icon\">").replaceAll("🖱️wheel", "<img src=\"img/mouse_wheel.svg\" class=\"icon\">").replaceAll("🖱️", "<img src=\"img/mouse.svg\" class=\"icon\">");
};
$.type = function (Z) {
  Z = typeof Z === "string" ? $(Z) : Z;
  return Z.tagName.toLowerCase();
};
$.show = function (Z) {
  Z = typeof Z === "string" ? $(Z) : Z;
  $c(Z).remove("hide");
};
$.hide = function (Z) {
  Z = typeof Z === "string" ? $(Z) : Z;
  $c(Z).add("hide");
};
$.setShow = function (Z, h) {
  Z = typeof Z === "string" ? $(Z) : Z;
  if (h) {
    $.show(Z);
  } else {
    $.hide(Z);
  }
};
$.isActive = function (Z) {
  return $c("button[data-id=\"" + Z + "\"]").contains("active");
};
$.error = function (Z) {
  $("#error_msg").innerHTML = $.parse(Z);
  if (Z == "") {
    $.hide("#error");
  } else {
    $.show("#error");
  }
};
$.top_right = function (Z) {
  $("#top_right").innerHTML = $.parse(Z);
  if (Z == "") {
    $.hide("#top_right");
  } else {
    $.show("#top_right");
  }
};
function preventDefault(Z) {
  Z.preventDefault();
}
$.size = function (Z) {
  Z = typeof Z === "string" ? $(Z) : Z;
  var h = window.getComputedStyle(Z);
  return {
    x: round(parseFloat(h.left)),
    y: round(parseFloat(h.top)),
    w: round(parseFloat(h.width)),
    h: round(parseFloat(h.height))
  };
};
function updateBOX(Z, h, w, v) {
  var l = $.isActive("grid_mode");
  var g;
  var x;
  var s;
  var u;
  var J = l ? GRIDSZ : 1;
  var G = 4096;
  var H = min(G, max(GRIDSZ, ceil(CFG.min_size / GRIDSZ) * GRIDSZ));
  if (gButton == 2) {
    H = l ? GRIDSZ : 1;
  }
  if (l || gButton == 2) {
    if (l) {
      if (w < Z && abs(w - Z) < GRIDSZ) {
        w = Z;
      }
      if (v < h && abs(v - h) < GRIDSZ) {
        v = h;
      }
    }
    if (w >= Z) {
      g = floor(Z / J) * J;
      x = ceil(w / J) * J;
      x = min(max(x, g + H), g + G);
    } else {
      g = floor(w / J) * J;
      x = ceil(Z / J) * J;
      g = max(min(g, x - H), x - G);
    }
    if (v >= h) {
      s = floor(h / J) * J;
      u = ceil(v / J) * J;
      u = min(max(u, s + H), s + G);
    } else {
      s = floor(v / J) * J;
      u = ceil(h / J) * J;
      s = max(min(s, u - H), u - G);
    }
  } else {
    if (w >= Z) {
      g = Z;
      x = ceil((w - Z) / GRIDSZ) * GRIDSZ + Z;
      x = min(max(x, g + H), g + G);
    } else {
      g = floor((w - Z) / GRIDSZ) * GRIDSZ + Z;
      x = Z;
      g = max(min(g, x - H), x - G);
    }
    if (v >= h) {
      s = h;
      u = ceil((v - h) / GRIDSZ) * GRIDSZ + h;
      u = min(max(u, s + H), s + G);
    } else {
      s = floor((v - h) / GRIDSZ) * GRIDSZ + h;
      u = h;
      s = max(min(s, u - H), u - G);
    }
  }
  BOX.style.left = g + "px";
  BOX.style.top = s + "px";
  BOX.style.width = x - g + "px";
  BOX.style.height = u - s + "px";
}
var CV = {
  changed: true
};
CV.save = function () {
  var Z = null;
  if (!$.isActive("mask_draw") && !$.isActive("brush_draw") && gButton == 2) {
    var h = $.size(BOX);
    Z = CV.new(h.w, h.h);
    Z.getContext("2d").drawImage(CV.main, h.x, h.y, h.w, h.h, 0, 0, h.w, h.h);
  } else {
    Z = CV.trim(CV.mainC);
    if (!Z) {
      $.error("Canvas is empty.");
      return;
    }
  }
  var w = $("#save_canvas");
  w.setAttribute("download", "Hua " + getYMDHMS() + ".png");
  w.setAttribute("href", Z.toDataURL("image/png"));
  w.click();
};
CV.loadBlob = function (Z, h, w = null) {
  var v = new Image();
  v.onload = function () {
    var l = v.width;
    var g = v.height;
    if (Z == null) {
      Z = CV.new(l, g).getContext("2d");
    }
    Z.drawImage(v, 0, 0, l, g, 0, 0, l, g);
    URL.revokeObjectURL(v.src);
    if (w) {
      w(Z.canvas);
    }
  };
  v.onerror = function (l) {
    $.error("Invalid image file.");
    URL.revokeObjectURL(v.src);
  };
  v.src = URL.createObjectURL(h);
};
CV.loadDataURL = function (Z, v, l, g, s, u) {
  var J = new Image();
  J.onload = function () {
    Z.drawImage(J, l, g, s, u);
  };
  J.src = v;
};
CV.load = function () {
  if (App.eeMoving) {
    $.error("Please place the last image first.");
    return;
  }
  $.error("Loading image...");
  CV.loadBlob(null, $("#imageLoader").files[0], Z => {
    CV.loadToNew(Z);
  });
};
CV.loadToNew = function (Z) {
  Z.style.left = gMouseNow.x + "px";
  Z.style.top = gMouseNow.y + "px";
  SKETCH.appendChild(Z);
  App.eeMoving = Z;
  $.error("L🖱️ to place, Ctrl+L🖱️ to place at center of canvas, R🖱️ to cancel.");
};
CV.copy = function () {
  var Z = null;
  if (!$.isActive("mask_draw") && !$.isActive("brush_draw") && gButton == 2) {
    var h = $.size(BOX);
    Z = CV.new(h.w, h.h);
    Z.getContext("2d").drawImage(CV.main, h.x, h.y, h.w, h.h, 0, 0, h.w, h.h);
  } else {
    Z = CV.trim(CV.mainC);
    if (!Z) {
      $.error("Canvas is empty.");
      return;
    }
  }
  Z.toBlob(async l => {
    try {
      await navigator.clipboard.write([new ClipboardItem({
        [l.type]: l
      })]);
      $.error("Copied to clipboard.");
    } catch (x) {
      console.log(x);
      $.error("This browser cannot access clipboard. Try Chrome, or save the image file instead.");
    }
  });
};
CV.paste = async function () {
  if (App.eeMoving) {
    $.error("Please place the last image first.");
    return;
  }
  $.error("Loading clipboard...");
  try {
    const h = await navigator.clipboard.read();
    for (const w of h) {
      var Z = false;
      for (const v of w.types) {
        if (v === "image/png") {
          Z = true;
          CV.loadBlob(null, await w.getType(v), g => {
            CV.loadToNew(g);
          });
        }
      }
      if (!Z) {
        $.error("Clipboard does not contain image.");
      }
    }
  } catch (x) {
    console.log(x);
    $.error("This browser cannot access clipboard. Try Chrome, or open the image file instead.");
  }
};
CV.snapshot = function () {
  if (!CV.changed) {
    for (let Z of [CV.mainC, CV.maskC]) {
      let h = Z.canvas;
      if (h.snapshotIndex + 1 < h.snapshot.length) {
        h.snapshot.length = h.snapshotIndex + 1;
      }
    }
    CV.changed = true;
  } else {
    for (let v of [CV.mainC, CV.maskC]) {
      let l = v.canvas;
      l.toBlob(g => {
        if ("snapshot" in l) {
          l.snapshotIndex += 1;
          if (l.snapshotIndex > 9) {
            l.snapshot.shift();
            l.snapshotIndex = 9;
          }
          if (l.snapshotIndex < l.snapshot.length) {
            l.snapshot.length = l.snapshotIndex;
          }
          l.snapshot.push(g);
        } else {
          l.snapshotIndex = 0;
          l.snapshot = [g];
        }
      });
    }
  }
};
CV.undo = function () {
  if (!("snapshot" in CV.main)) {
    $.error("Nothing to undo.");
    return;
  }
  for (let Z of [CV.mainC, CV.maskC]) {
    let h = Z.canvas;
    try {
      if (h.snapshotIndex == h.snapshot.length - 1 && CV.changed) {
        h.toBlob(v => {
          h.snapshot.push(v);
          CV.changed = false;
          Z.clearRect(0, 0, Z.canvas.width, Z.canvas.height);
          CV.loadBlob(Z, h.snapshot[h.snapshotIndex]);
        });
      } else {
        if (h.snapshotIndex <= 0) {
          $.error("Undo limit reached.");
          return;
        }
        h.snapshotIndex -= 1;
        Z.clearRect(0, 0, Z.canvas.width, Z.canvas.height);
        CV.loadBlob(Z, h.snapshot[h.snapshotIndex]);
      }
    } catch (g) {}
  }
};
CV.redo = function () {
  for (let Z of [CV.mainC, CV.maskC]) {
    let w = Z.canvas;
    if (!("snapshot" in w)) {
      $.error("Nothing to redo.");
      return;
    }
    if (w.snapshotIndex >= w.snapshot.length - 1) {
      $.error("This is already the latest canvas.");
      return;
    }
    try {
      w.snapshotIndex += 1;
      Z.clearRect(0, 0, Z.canvas.width, Z.canvas.height);
      CV.loadBlob(Z, w.snapshot[w.snapshotIndex]);
    } catch (g) {}
  }
};
CV.noise = function (Z, v, l) {
  var g = Z.createImageData(128, 128);
  var x = new Uint8Array(g.data.buffer);
  for (var s = 0; s < v; s += 128) {
    for (var u = 0; u < l; u += 128) {
      window.crypto.getRandomValues(x);
      for (var J = 0; J < x.length; J += 4) {
        x[J + 3] = 255;
      }
      Z.putImageData(g, s, u);
    }
  }
};
CV.grid = function (Z) {
  var v = Z.canvas.width;
  var l = Z.canvas.height;
  for (var g = 0; g < v / GRIDSZ; g++) {
    for (var s = 0; s < l / GRIDSZ; s++) {
      Z.fillStyle = (g + s) % 2 == 0 ? "#2f2f2f" : "#282828";
      Z.fillRect(g * GRIDSZ, s * GRIDSZ, GRIDSZ, GRIDSZ);
    }
  }
};
CV.trim = function (Z) {
  var h = CV.getTrimSize(Z);
  if (h.w == 0 || h.h == 0) {
    return null;
  }
  var w = CV.new(h.w, h.h);
  w.getContext("2d").drawImage(Z.canvas, h.x, h.y, h.w, h.h, 0, 0, h.w, h.h);
  return w;
};
CV.getTrimSize = function (Z) {
  function h(H, f, T) {
    for (var N = 0; N < f; ++N) {
      if (H.data[T * f * 4 + N * 4 + 3] !== 0) {
        return false;
      }
    }
    return true;
  }
  function v(H, f, T, N, e) {
    for (var K = N; K < e; ++K) {
      if (H.data[K * f * 4 + T * 4 + 3] !== 0) {
        return false;
      }
    }
    return true;
  }
  var l = Z.canvas;
  var g = l.width;
  var x = Z.getImageData(0, 0, l.width, l.height);
  var s = 0;
  var u = x.height;
  var J = 0;
  var G = x.width;
  while (s < u && h(x, g, s)) {
    ++s;
  }
  while (u - 1 > s && h(x, g, u - 1)) {
    --u;
  }
  while (J < G && v(x, g, J, s, u)) {
    ++J;
  }
  while (G - 1 > J && v(x, g, G - 1, s, u)) {
    --G;
  }
  return {
    x: J,
    y: s,
    w: G - J,
    h: u - s
  };
};
CV.new = function (Z, v) {
  var l = document.createElement("canvas");
  l.width = Z;
  l.height = v;
  return l;
};
var App = {
  progress: {
    progress: 0
  },
  progImgBak: "",
  progSafeCheck: 0,
  modelTarget: "",
  optionNow: {}
};
var CFG = {};
var GRIDSZ = 64;
var gButton = -1;
var gMouseLast = {
  x: -1,
  y: -1
};
var gMouseNow = {
  x: -1,
  y: -1
};
App.task = {};
App.helpSeen = false;
App.eeMoving = null;
App.eeMovingRestore = null;
App.userMaskActive = false;
function updateBrush(Z) {
  var h = 5;
  Z = min(max(Z, h), 128);
  gBrush.sz = Z;
  const w = CV.new(Z, Z);
  const v = w.getContext("2d");
  v.lineWidth = h;
  v.strokeStyle = $.isActive("mask_draw") ? "#000" : gBrush.color;
  v.arc(Z / 2, Z / 2, (Z - h) / 2, 0, Math.PI * 2);
  v.stroke();
  w.toBlob(function (l) {
    if (gBrush.url) {
      URL.revokeObjectURL(gBrush.url);
    }
    gBrush.url = URL.createObjectURL(l);
    SKETCH.style.cursor = "url(" + gBrush.url + ") " + Z / 2 + " " + Z / 2 + ", auto";
  });
}
App.mousemove = Z => {
  var h = gMouseNow.x;
  var w = gMouseNow.y;
  if (App.eeMoving) {
    var v = $.isActive("grid_mode") ? GRIDSZ : 1;
    h = floor(h / v) * v;
    w = floor(w / v) * v;
    App.eeMoving.style.left = h + "px";
    App.eeMoving.style.top = w + "px";
    return;
  }
  var l = $.isActive("mask_draw");
  var g = $.isActive("brush_draw");
  if (g && Z.ctrlKey) {
    var x = CV.mainC.getImageData(h, w, 1, 1).data;
    if (x[3] > 0) {
      x = "rgb(" + x[0] + "," + x[1] + "," + x[2] + ")";
      gBrush.color = x;
      updateBrush(gBrush.sz);
    }
    return;
  }
  if (l || g) {
    if (gButton < 0) {
      return;
    } else {
      var s = l ? CV.maskC : CV.mainC;
      s.lineWidth = gBrush.sz;
      s.lineJoin = s.lineCap = "round";
      s.strokeStyle = l ? "#fff" : gBrush.color;
      if (gButton == 2) {
        s.globalCompositeOperation = "destination-out";
      }
      s.beginPath();
      s.moveTo(gMouseLast.x, gMouseLast.y);
      s.lineTo(h, w);
      s.stroke();
      s.globalCompositeOperation = "source-over";
      if (g && gButton == 0) {
        s = CV.maskC;
        s.lineWidth = gBrush.sz + 4;
        s.lineJoin = s.lineCap = "round";
        s.strokeStyle = "#fff";
        s.beginPath();
        s.moveTo(gMouseLast.x, gMouseLast.y);
        s.lineTo(h, w);
        s.stroke();
      }
      gMouseLast.x = h;
      gMouseLast.y = w;
    }
    return;
  }
  if (gButton < 0) {
    updateBOX(h, w, h, w);
  } else {
    updateBOX(gMouseLast.x, gMouseLast.y, h, w);
  }
};
function setBtn(Z, h, w = true) {
  if (h) {
    $c("button[data-id=" + Z + "]").add("active");
  } else {
    $c("button[data-id=" + Z + "]").remove("active");
  }
  if (Z == "help_show") {
    if (h) {
      App.helpSeen = true;
    }
    $.setShow("#help", h);
  } else if (Z == "prompt_show") {
    onJSONblur({
      target: $("#prompt")
    });
    $.setShow("#prompt_wrap", h);
    setTimeout(function () {
      $("#prompt").focus();
    }, 0);
  } else if (Z == "config_show") {
    $.setShow("#config_wrap", h);
    setTimeout(function () {
      $("#config").focus();
    }, 0);
  } else if (Z == "palette_show") {
    $.setShow("#palette", h);
    if (w) {
      if (h) {
        if (!$.isActive("brush_draw")) {
          setBtn("brush_draw", true);
        }
      }
    }
  } else if (Z == "mask_show") {
    $.setShow(CV.mask, h);
    if (w) {
      App.userMaskActive = h;
      if (!h) {
        if ($.isActive("mask_draw")) {
          setBtn("mask_draw", false);
        }
      }
    }
  } else if (Z == "mask_draw") {
    if (h) {
      setBtn("brush_draw", false);
      updateBrush(gBrush.sz);
      setBtn("mask_show", true);
    } else {
      SKETCH.style.cursor = "crosshair";
    }
  } else if (Z == "brush_draw") {
    if (h) {
      setBtn("mask_show", false);
      setBtn("mask_draw", false);
      setBtn("palette_show", true);
      updateBrush(gBrush.sz);
    } else {
      setBtn("palette_show", false);
      SKETCH.style.cursor = "crosshair";
    }
  } else if (Z == "error_close") {
    $.error("");
  } else if (Z == "grid_mode") {
    if (gMouseNow.x != -1 && gMouseNow.y != -1) {
      App.mousemove({});
    }
  }
}
function toggleBtn(Z) {
  setBtn(Z, !$.isActive(Z));
}
App.setObj = function (Z, h) {
  localStorage.setItem("HUA_V1_" + Z, JSON.stringify(h));
};
App.getObj = function (Z) {
  try {
    var h = JSON.parse(localStorage.getItem("HUA_V1_" + Z));
    if (h) {
      return h;
    } else {
      return {};
    }
  } catch (w) {
    return {};
  }
};
App.readStatus = function () {
  var Z = Object.assign({
    prompt: "a color photo of cityscape, street, building, trees, sky",
    negative_prompt: "ugly, bad quality, error, blurry, blurred",
    seed: -1,
    cfg_scale: 7,
    sampler_index: "LMS",
    steps: 50,
    denoising_strength: 1,
    inpainting_fill: 1,
    mask_blur: 0,
    batch_size: 1,
    inpaint_full_res: false
  }, App.getObj("PROMPT"));
  CFG = Object.assign({
    server: "127.0.0.1:7860",
    canvas_w: 0,
    canvas_h: 0,
    min_size: 512,
    seam_fix_radius: 5
  }, App.getObj("CONFIG"));
  if (CFG.canvas_w > 0) {
    CFG.canvas_w = min(max(CFG.canvas_w, 512), 4096);
    CFG.canvas_w = floor(CFG.canvas_w / GRIDSZ) * GRIDSZ;
  } else {
    CFG.canvas_w = 0;
  }
  if (CFG.canvas_h > 0) {
    CFG.canvas_h = min(max(CFG.canvas_h, 512), 4096);
    CFG.canvas_h = floor(CFG.canvas_h / GRIDSZ) * GRIDSZ;
  } else {
    CFG.canvas_h = 0;
  }
  CFG.seam_fix_radius = min(32, max(0, CFG.seam_fix_radius));
  App.setObj("PROMPT", Z);
  App.setObj("CONFIG", CFG);
  $("#prompt").value = stringify(Z);
  $("#config").value = stringify(CFG);
};
App.readStatus();
$("#prompt").setSelectionRange(13, 13);
App.clearDefault = function (Z) {
  Z.preventDefault();
  Z.stopPropagation();
  $.error("");
};
App.reset = function () {
  App.setObj("PROMPT", null);
  App.setObj("CONFIG", null);
  App.readStatus();
};
App.resetPrompt = function () {
  App.setObj("PROMPT", null);
  App.readStatus();
  setBtn("help_show", false);
  onJSONblur({
    target: $("#prompt")
  });
};
App.resetConfig = function () {
  App.setObj("CONFIG", null);
  App.readStatus();
  setBtn("help_show", false);
};
App.getServer = function () {
  var Z = "http://" + CFG.server;
  if (CFG.server.startsWith("https://") || CFG.server.startsWith("http://")) {
    Z = CFG.server;
  }
  Z = Z.trim();
  if (Z.endsWith("/")) {
    Z = Z.substring(0, Z.length - 1);
  }
  return Z;
};
App.sync = function () {
  try {
    for (var Z in App.task) {
      Z = parseInt(Z);
      var h = App.task[Z];
      if (h.status == -1 || h.status == 1) {
        throw new Error();
      }
    }
    var w = -1;
    var v = Date.now();
    for (var Z in App.task) {
      Z = parseInt(Z);
      var h = App.task[Z];
      if (h.status == 0 && h.timestamp < v) {
        w = Z;
        v = h.timestamp;
      }
    }
    if (w != -1) {
      var h = App.task[w];
      h.status = 1;
      post(h.URL, h.prompt).then(F => h.funGood(F)).catch(F => h.funBad(F));
    }
  } catch (F) {}
  var l = $.size(BOX);
  var g = "";
  var x = "";
  if (gButton < 0) {
    g = "L🖱️ generate, R🖱️ functions";
  } else if (gButton == 0) {
    var s = JSON.parse($("#prompt").value);
    g = "L🖱️ run, R🖱️ cancel, <span class=\"box_input\">run<input type=\"number\" class=\"box_trial\" style=\"width:2.6em;height:2em;font-weight:bold\" value=\"1\">\n    , str<input type=\"number\" class=\"box_strength\" style=\"width:3.6em;height:2em;font-weight:bold\" value=\"" + s.denoising_strength + "\" step=\"0.05\"></span>";
    try {
      s.denoising_strength = parseFloat(BOX.querySelector(".box_strength").value);
    } catch (P) {}
    x = stringify(s).replace("{\n\"", "<span style=\"color:#aaa;\">").replace("\n}", "</span>").replaceAll("\": \"", "</span> <span style=\"color:#eee;\">").replaceAll("\": ", "</span> <span style=\"color:#eee;\">").replaceAll("\",\n\"", "</span>\n<span style=\"color:#aaa;\">").replaceAll(",\n\"", "</span>\n<span style=\"color:#aaa;\">").trim().replaceAll("\n", "<br>");
  } else {
    g = "<select class=\"box_select\">\n    <option>🧹Erase</option><option>🍀Move</option><option>👯Clone</option>\n    <option>🌟Scale2x</option><option>🌟Scale3x</option><option>🌟Scale4x</option>\n    <option>🌑Mask</option><option>🌕Unmask</option>\n    </select> <span>L🖱️ confirm, R🖱️ cancel</span>";
  }
  g = $.parse(g);
  var u = BOX.querySelector(".box_str");
  if (g != u.innerHTML) {
    u.innerHTML = g;
  }
  u = BOX.querySelector(".box_prompt");
  if (x != u.innerHTML) {
    u.innerHTML = x;
  }
  BOX.querySelector(".box_remark").innerHTML = l.w + "x" + l.h;
  if ($.isActive("mask_draw") || $.isActive("brush_draw") || App.eeMoving) {
    BOX.style.display = "none";
  } else {
    BOX.style.display = "block";
  }
  if (gButton <= 0) {
    BOX.style.backgroundImage = "radial-gradient(circle at 100% 100%,transparent -1px,rgba(0,139,0,0.72) -1px,rgba(0,139,0,0.72) 1px,transparent 1px),linear-gradient(to right,rgba(0,139,0,0.72),rgba(0,110,255,0.72)),radial-gradient(circle at 0% 100%,transparent -1px,rgba(0,110,255,0.72) -1px,rgba(0,110,255,0.72) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,110,255,0.72),rgba(215,19,19,0.72)),radial-gradient(circle at 0% 0%,transparent -1px,rgba(215,19,19,0.72) -1px,rgba(215,19,19,0.72) 1px,transparent 1px),linear-gradient(to left,rgba(215,19,19,0.72),rgba(172,103,0,0.72)),radial-gradient(circle at 100% 0%,transparent -1px,rgba(172,103,0,0.72) -1px,rgba(172,103,0,0.72) 1px,transparent 1px),linear-gradient(to top,rgba(172,103,0,0.72),rgba(0,139,0,0.72))";
  } else {
    BOX.style.backgroundImage = "radial-gradient(circle at 100% 100%, transparent -1px, rgba(255,0,0,0.8) -1px, rgba(255,0,0,0.8) 1px, transparent 1px), linear-gradient(to right, rgba(255,0,0,0.8), rgba(231,69,0,0.8)), radial-gradient(circle at 0% 100%, transparent -1px, rgba(231,69,0,0.8) -1px, rgba(231,69,0,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,69,0,0.8), rgba(255,0,0,0.8)), radial-gradient(circle at 0% 0%, transparent -1px, rgba(255,0,0,0.8) -1px, rgba(255,0,0,0.8) 1px, transparent 1px), linear-gradient(to left, rgba(255,0,0,0.8), rgba(231,69,0,0.8)), radial-gradient(circle at 100% 0%, transparent -1px, rgba(231,69,0,0.8) -1px, rgba(231,69,0,0.8) 1px, transparent 1px), linear-gradient(to top, rgba(231,69,0,0.8), rgba(255,0,0,0.8))";
  }
  try {
    BOX.querySelector(".box_trial").onchange = function (y) {
      var O = y.target;
      O.value = min(99, max(1, parseInt(O.value)));
    };
    BOX.querySelector(".box_strength").onchange = function (y) {
      var O = y.target;
      O.value = round(min(1, max(0.05, parseFloat(O.value))) * 20) / 20;
    };
  } catch (y) {}
  try {
    BOX.querySelector(".box_select").onchange = function (O) {
      var V = O.target;
      V = V.options[V.selectedIndex].text.toLowerCase();
      V = Array.from(V).slice(1).join("");
      if (V == "mask" || V == "unmask") {
        setBtn("mask_show", true, false);
      } else {
        setBtn("mask_show", App.userMaskActive, false);
      }
    };
  } catch (O) {}
  try {
    var J = document.querySelectorAll(".box_genstat").length;
    if (J > 0) {
      var G = Object.keys(App.task).sort((V, m) => Math.sign(App.task[V].timestamp - App.task[m].timestamp));
      var H = 0;
      for (var f = 0; f < G.length; f++) {
        var Z = G[f];
        var T = $(".drawBox[task=\"" + Z + "\"]");
        var l = $.size(T);
        var u = T.querySelector(".box_genstat");
        if (u) {
          var N = "?";
          var K = "?";
          var A = App.progress;
          if (H == 0 && A.progress != 0) {
            N = Math.abs(parseFloat(A.progress));
            K = Math.round(Math.abs(parseFloat(A.eta_relative)));
            if (N == 1) {
              App.progress = {
                progress: 0
              };
            }
            if (A.current_image) {
              var q = A.current_image;
              if (App.progImgBak != q) {
                App.progImgBak = q;
                if (!q.startsWith("data:")) {
                  q = "data:image/png;base64," + q;
                }
                CV.loadDataURL(CV.mainC, q, l.x, l.y, l.w, l.h);
              }
            }
          }
          u.innerHTML = "<span class=\"box_progress\" style=\"color:#0f0;\">" + (N == "?" ? "?" : Math.round(N * 100)) + "%</span> of " + App.task[Z].prompt.n_iter + " (" + K + "s) queue <span style=\"color:#0f0;\">" + (H + 1) + "</span> / " + J;
          H += 1;
        }
      }
    }
  } catch (C) {
    console.log(C);
  }
};
App.syncA1111 = function () {
  var Z = App.getServer();
  try {
    gget(Z + "/sdapi/v1/options").then(h => {
      App.optionNow = h;
      App.modelTarget = App.optionNow.sd_model_checkpoint;
      try {
        $("#prompt_model").selectedIndex = App.sd_models.findIndex(function (v) {
          return v.title == App.optionNow.sd_model_checkpoint;
        });
      } catch (l) {}
    }).catch(h => {});
    gget(Z + "/sdapi/v1/samplers").then(h => {
      if (JSON.stringify(App.samplers) != JSON.stringify(h)) {
        App.samplers = h;
        var w = "";
        for (var v of h) {
          w += "<option>" + v.name + "</option>";
        }
        $("#prompt_sampler").innerHTML = w;
        onJSONblur({
          target: $("#prompt")
        });
      }
    }).catch(h => {});
    gget(Z + "/sdapi/v1/sd-models").then(h => {
      if (JSON.stringify(App.sd_models) != JSON.stringify(h)) {
        App.sd_models = h;
        var w = "";
        for (var v of h) {
          w += "<option>" + v.title + "</option>";
        }
        $("#prompt_model").innerHTML = w;
        try {
          $("#prompt_model").selectedIndex = App.sd_models.findIndex(function (g) {
            return g.title == App.optionNow.sd_model_checkpoint;
          });
        } catch (g) {}
      }
    }).catch(h => {});
  } catch (h) {}
};
App.syncProgress = function () {
  var Z = App.getServer();
  var h = true;
  for (l in App.task) {
    if (App.task[l].status == 1) {
      h = false;
    }
  }
  if (h) {
    return;
  }
  var w = true;
  try {
    var v = Object.keys(App.task).sort((g, x) => Math.sign(App.task[g].timestamp - App.task[x].timestamp));
    var l = App.task[v[0]];
    if (l.prompt.width == 512 && l.prompt.height == 512) {
      w = false;
    }
  } catch (x) {}
  try {
    let s = App.progSafeCheck;
    gget(Z + ("/sdapi/v1/progress?skip_current_image=" + w)).then(u => {
      if (s == App.progSafeCheck) {
        App.progress = u;
      } else {}
    }).catch(u => {});
  } catch (u) {}
};
App.syncPrompt = function () {
  var Z = JSON.parse($("#prompt").value);
  var h = null;
  h = $("#prompt_sampler");
  Z.sampler_index = h.options[h.selectedIndex].text;
  h = $("#prompt_fill");
  Z.inpainting_fill = h.selectedIndex;
  $("#prompt").value = stringify(Z);
  onJSONblur({
    target: $("#prompt")
  });
};
App.syncModel = () => {
  try {
    var Z = App.getServer();
    var h = $("#prompt_model");
    if (App.modelTarget != h.options[h.selectedIndex].text) {
      App.modelTarget = h.options[h.selectedIndex].text;
      let w = App.modelTarget;
      post(Z + "/sdapi/v1/options", {
        sd_model_checkpoint: w
      }).then(v => {
        if (w == App.modelTarget) {
          $.top_right("");
        }
      }).catch(v => {
        if (w == App.modelTarget) {
          $.top_right("");
        }
        $.error("Cannot switch model.");
      });
      $.top_right("Switching to " + w + "...");
    }
  } catch (l) {}
};
$("#help").innerHTML = $.parse("\nPaintHua.com is 100% free. It can connect to your local A1111 via its API.\n<ul>\n<li>Update A1111 to LATEST version with git pull. Chrome browser recommended (Brave shield will block A1111 because it's HTTP).</li>\n<li><span style=\"color:gold\">set COMMANDLINE_ARGS=--api --cors-allow-origins=https://www.painthua.com</span> in webui-user.bat.</li>\n<li>A1111 settings: use <a href=\"https://huggingface.co/runwayml/stable-diffusion-inpainting\" target=\"_blank\">sd-v1.5-inpainting</a> model, turn off \"Apply color correction to img2img results\", and set \"Inpainting conditioning mask strength\" to 1.</li>\n<li>Add --listen if you need LAN access. When connecting to IP other than 127.0.0.1, google \"enable mixed content\" and change site settings (because A1111 is HTTP instead of HTTPS).</li>\n<li>PaintHua can connect to colab. <a href=\"https://github.com/BlinkDL/Hua\" targe=\"_blank\">Click for guide.</a></li>\n</ul>\n<br>Tips:&nbsp; <a href=\"https://discord.gg/y9kMYtjgFZ\" target=\"_blank\">Discord (help you 🙋)</a>\n&nbsp;<a href=\"https://www.youtube.com/watch?v=OAoQLFzPABY\" target=\"_blank\">Youtube Guide</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV16e4y1a7ne\" target=\"_blank\">B站教程</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV15R4y1f7sh\" target=\"_blank\">整合包1</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV1dP411g7YN\" target=\"_blank\">整合包2</a>\n&nbsp;<a href=\"https://gigazine.net/news/20221113-hua-stable-diffusion-outpainting/\" target=\"_blank\">使い方</a>\n&nbsp;<a href=\"https://github.com/BlinkDL/Hua\" target=\"_blank\">Github</a>\n<ul><li><span style=\"color:gold\">Set canvas size in Config (0 means window size, 4096 max). Close config and refresh page to apply.</span></li>\n<li>Space: prompt. Tab: toggle mask. ESC: close info banner or textbox. G: toggle grid mode.</li>\n<li>Prompt \"inpainting_fill\": 0=fill, 1=original, 2=latentNoise, 3=latentNothing. <span style=\"color:gold\">Some can reduce seams.</span></li>\n</ul>\n<br>Normal mode (for txt2img / inpainting / outpainting)\n<ul><li>L🖱️ generate. Move 🖱️ (don't hold L🖱️) to adjust size, 🖱️wheel for #trials, L🖱️ again to confirm.</li>\n<li>🖱️wheel to browse results (move 🖱️ to bottom of box to hide buttons). 🖱️wheel on [+1] for [+more].</li>\n<li>R🖱️ functions. 🖱️wheel to switch function. Ctrl+C/S is restricted to the box.</li></ul>\n<br>Mask mode (hotkey: Shift) (🖱️wheel for brush size)\n<ul><li>L🖱️ draw mask for inpainting. For doing inpainting, switch to normal mode and draw a large box covering both masked regions and relevant image context.</li>\n<li>R🖱️ erase mask. The mask is also automatically erased when you accept a box.</li></ul>\n<br>Brush mode (hotkey: `) (🖱️wheel for brush size)\n<ul><li>L🖱️ paint, R🖱️ erase. All affected regions are automatically masked. Try drawing some colors and inpaint on top of them.</li>\n<li>Ctrl+L🖱️ (or Ctrl+move 🖱️) pick color from canvas.</li></ul>\n<br>i2i (img2img) mode: This will ignore mask. Good for improving upscaled images and brush sketches.\n<br><br>Troubleshoot: <a href=\"#\" style=\"margin:0 1em\" onclick=\"App.resetPrompt()\">reset prompt</a> <a href=\"#\" onclick=\"App.resetConfig()\">reset config</a>\n");
var gPalette = "000000 222034 45283c 663931 8f563b df7126 d9a066 eec39a fbf236 99e550 6abe30 37946e 4b692f 8f974a 8a6f30 524b24 323c39 3f3f74 306082 5b6ee1 639bff 5fcde4 cbdbfc ffffff 9badb7 847e87 696a6a 595652 76428a d77bba d95763 ac3232".split(" ");
var tmp = "";
for (var i of gPalette) {
  tmp += "<span style=\"background:#" + i + ";\" class=\"unselectable\"></span>";
}
$("#palette").innerHTML = tmp;
var gBrush = {
  sz: 64,
  url: null,
  color: "#eec39a"
};
function onJSONblur(Z) {
  var h = Z.target;
  var w = h.id.toUpperCase();
  try {
    var v = JSON.parse(h.value);
    h.value = stringify(v);
    App.setObj(w, v);
    App.readStatus();
    $.error("");
  } catch (x) {
    $.error(w + " is not a valid JSON. Please check its format.");
  }
  if (w == "PROMPT") {
    try {
      var l = JSON.parse($("#prompt").value);
      $("#prompt_sampler").selectedIndex = App.samplers.findIndex(function (u) {
        return u.name.toLowerCase() == l.sampler_index.toLowerCase();
      });
      $("#prompt_fill").selectedIndex = parseInt(l.inpainting_fill);
    } catch (u) {}
  }
}
$("#prompt").addEventListener("blur", onJSONblur);
$("#config").addEventListener("blur", onJSONblur);
var SKETCH = $("#sketch");
if (CFG.canvas_w > 0) {
  SKETCH.style.width = CFG.canvas_w + "px";
}
if (CFG.canvas_h > 0) {
  SKETCH.style.height = CFG.canvas_h + "px";
}
var W_FULL = parseFloat(getComputedStyle(SKETCH).getPropertyValue("width"));
var H_FULL = parseFloat(getComputedStyle(SKETCH).getPropertyValue("height"));
var WW = floor(W_FULL / GRIDSZ) * GRIDSZ;
var HH = floor(H_FULL / GRIDSZ) * GRIDSZ;
SKETCH.style.left = (W_FULL - WW) / 2 + "px";
SKETCH.style.top = (H_FULL - HH) / 2 + "px";
SKETCH.style.width = WW + "px";
SKETCH.style.height = HH + "px";
CV.bg = CV.new(WW, HH);
CV.bgC = CV.bg.getContext("2d");
CV.grid(CV.bgC);
SKETCH.appendChild(CV.bg);
CV.main = CV.new(WW, HH);
CV.mainC = CV.main.getContext("2d", {
  willReadFrequently: true
});
SKETCH.appendChild(CV.main);
CV.mask = CV.new(WW, HH);
CV.maskC = CV.mask.getContext("2d", {
  willReadFrequently: true
});
CV.mask.style.opacity = 0.5;
CV.mask.style.filter = "sepia(100%) hue-rotate(-60deg) saturate(100000%)";
SKETCH.appendChild(CV.mask);
var BOX = document.createElement("div");
BOX.classList.add("drawBox");
BOX.style.left = GRIDSZ + "px";
BOX.style.top = GRIDSZ + "px";
BOX.style.width = CFG.min_size + "px";
BOX.style.height = CFG.min_size + "px";
BOX.innerHTML = "<div class=\"box_str\"></div><div class=\"box_prompt\"></div><div class=\"box_remark\" style=\"position:absolute;bottom:0.3em;right:0.3em\"></div>";
SKETCH.appendChild(BOX);
setInterval(function () {
  App.sync();
}, 200);
setInterval(function () {
  App.syncProgress();
}, 1000);
App.syncA1111();
CV.draw = function (Z, v, l, g) {
  let s = {};
  try {
    s = JSON.parse($("#prompt").value);
    $.error("");
  } catch (V) {
    $.error("Prompt invalid. Please check its format.");
    return;
  }
  var u = CV.new(l, g);
  var J = u.getContext("2d", {
    willReadFrequently: true
  });
  J.drawImage(CV.main, Z, v, l, g, 0, 0, l, g);
  var G = u.toDataURL();
  J.fillStyle = "#fff";
  J.fillRect(0, 0, l, g);
  var H = true;
  var f = new Uint32Array(CV.mainC.getImageData(Z, v, l, g).data.buffer);
  var T = J.getImageData(0, 0, l, g);
  var N = new Uint32Array(T.data.buffer);
  var K = CFG.seam_fix_radius;
  for (var A = 0; A < f.length; A++) {
    if (f[A] >> 24 == -1) {
      H = false;
      N[A] = 4278190080;
      if (K > 0) {
        var q = A % l;
        for (var R = 1; R <= K; R++) {
          if (q - R >= 0 && f[A - R] >> 24 != -1) {
            break;
          }
          if (q + R < l && f[A + R] >> 24 != -1) {
            break;
          }
          if (A - l * R >= 0 && f[A - l * R] >> 24 != -1) {
            break;
          }
          if (A + l * R < f.length && f[A + l * R] >> 24 != -1) {
            break;
          }
          if (R == K) {
            R = K + 1;
            break;
          }
        }
        R = K + 1 - R;
        if (R > 0) {
          N[A] = 4278190080 + floor(R * 255 / (K + 1)) * 65793;
        }
      }
    }
  }
  J.putImageData(T, 0, 0);
  if (K > 0) {
    J.globalCompositeOperation = "lighten";
    J.drawImage(u, -K, 0);
    J.drawImage(u, K, 0);
    J.drawImage(u, 0, -K);
    J.drawImage(u, 0, K);
    J.globalCompositeOperation = "source-over";
  }
  App.sync();
  s = Object.assign(s, {
    width: l,
    height: g,
    n_iter: parseInt(BOX.querySelector(".box_trial").value),
    denoising_strength: parseFloat(BOX.querySelector(".box_strength").value),
    include_init_images: false
  });
  if (H && !$.isActive("i2i_mode")) {
    CV.noise(J, l, g);
    CV.mainC.drawImage(u, Z, v);
    s = Object.assign(s, {
      denoising_strength: 1
    });
    mylog("#draw/txt2img/" + l + "/" + g);
  } else {
    J.drawImage(CV.mask, Z, v, l, g, 0, 0, l, g);
    var n = u.toDataURL();
    CV.noise(J, l, g);
    J.drawImage(CV.main, Z, v, l, g, 0, 0, l, g);
    var F = u.toDataURL();
    if (!$.isActive("i2i_mode")) {
      console.img(n);
    }
    console.img(F);
    CV.mainC.drawImage(u, Z, v);
    s = Object.assign(s, {
      mask: n,
      init_images: [F]
    });
    if ($.isActive("i2i_mode")) {
      delete s.mask;
    }
    mylog("#draw/img2img/" + l + "/" + g);
  }
  try {
    var P = BOX.cloneNode(true);
    $.hide(P.querySelector(".box_prompt"));
    P.classList.add("border_dance");
    var M = 0;
    try {
      var k = Array.from(Object.keys(App.task)).map(Number);
      if (k.length > 0) {
        M = max(...k) + 1;
      }
    } catch (r) {}
    App.task[M] = {
      status: -1,
      timestamp: 1e+99,
      prompt: s,
      orig_img: G
    };
    P.setAttribute("task", M);
    SKETCH.appendChild(P);
    CV.sendPrompt(s, P);
  } catch (L) {
    console.log(L);
    var O = L.toString();
    mylog("#draw/err/" + O.substr(0, 100));
  }
};
CV.sendPrompt = function (Z, h) {
  h.querySelector(".box_str").innerHTML = "Generating... <span class=\"box_genstat\"></span><br>" + stringify(Z.prompt).replaceAll("\n", "<br> ").replaceAll("\"", "") + "<div class=\"box_inputX\" style=\"display:flex;align-items:center;width:min-content;\">\n    <button type=\"button\" data-id=\"box_cancel\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">❌</span></button>\n    </div>";
  h.querySelector(".box_inputX").addEventListener("mouseenter", function (s) {
    $.hide(BOX);
  });
  h.querySelector(".box_inputX").addEventListener("mouseleave", function (s) {
    $.show(BOX);
  });
  let w = $.size(h);
  let v = parseInt(h.getAttribute("task"));
  let l = App.task[v];
  var g = App.getServer();
  if ("init_images" in Z) {
    g = g + "/sdapi/v1/img2img";
  } else {
    g = g + "/sdapi/v1/txt2img";
  }
  l.URL = g;
  function x() {
    CV.mainC.clearRect(w.x, w.y, w.w, w.h);
    CV.loadDataURL(CV.mainC, l.orig_img, w.x, w.y, w.w, w.h);
    h.remove();
    h = null;
  }
  l.funGood = s => {
    l.status = 2;
    l.timestamp = 1e+99;
    App.progSafeCheck += 1;
    App.progress = {
      progress: 0
    };
    if (!("images" in s)) {
      if ("detail" in s) {
        $.error(s.detail.substr(0, 100));
      } else {
        $.error(CFG.server + " generation failed. try [reset prompt] in [Help].");
      }
      x();
      return;
    }
    var u = -1;
    for (var J of s.images) {
      if (!J.startsWith("data:")) {
        J = "data:image/png;base64," + J;
      }
      var G = 0;
      if (!("out_img" in l)) {
        l.out_img = [J];
      } else {
        G = parseInt(h.getAttribute("out_img")) + 1;
        l.out_img.splice(G, 0, J);
      }
      if (u == -1) {
        u = G;
        CV.loadDataURL(CV.mainC, J, w.x, w.y, w.w, w.h);
        $.error("");
      }
      h.setAttribute("out_img", G);
    }
    h.setAttribute("out_img", u);
    h.classList.add("decision_box");
    h.querySelector(".box_remark").innerHTML = "";
    h.querySelector(".box_str").innerHTML = "<div class=\"box_input\" style=\"display:flex;align-items:center;\">\n    <button type=\"button\" data-id=\"box_confirm\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">✔️</span></button>\n    <button type=\"button\" data-id=\"box_retry\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%;font-weight:bold\">+<span class=\"box_retry_count\">1</span></span></button>\n    <span class=\"box_of\" style=\"height:3em;margin:0 0.5em;display:inline-flex;align-items:center;\"></span>\n    <button type=\"button\" data-id=\"box_prev\" style=\"height:3em;width:3em;\"><span style=\"font-size:150%\">🡄</span></button>\n    <button type=\"button\" data-id=\"box_next\" style=\"height:3em;width:3em;\"><span style=\"font-size:150%\">🡆</span></button>\n    <button type=\"button\" data-id=\"box_remove\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">🗑️</span></button>\n    <button type=\"button\" data-id=\"box_cancel\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">❌</span></button>\n    </div>";
    h.querySelector(".box_of").innerHTML = parseInt(h.getAttribute("out_img")) + 1 + " of " + l.out_img.length;
    h.onmousemove = f => {
      $.hide(BOX);
      if (h.querySelector(".box_input")) {
        var T = $.size(BOX);
        var N = (f.clientX - f.target.getBoundingClientRect().left) / (T.w + 1);
        var K = (f.clientY - f.target.getBoundingClientRect().top) / (T.h + 1);
        if (K < 0.7) {
          $.show(h.querySelector(".box_str"));
        } else {
          $.hide(h.querySelector(".box_str"));
        }
      }
    };
    h.onmouseleave = f => {
      $.show(BOX);
      if (h.querySelector(".box_input")) {
        $.hide(h.querySelector(".box_str"));
      }
    };
    if (h.matches(":hover")) {
      $.hide(BOX);
      $.show(h.querySelector(".box_str"));
    }
    mylog("#draw/done/" + w.w + "/" + w.h);
  };
  l.funBad = s => {
    delete App.task[v];
    App.progSafeCheck += 1;
    App.progress = {
      progress: 0
    };
    x();
    console.log(s);
    var u = s.toString();
    var J = "Error with " + CFG.server + ", or invalid prompt. Run latest AUTOMATIC1111 with --api.";
    if (!CFG.server.includes("127.0.0.1") && !CFG.server.startsWith("https://")) {
      J += "<br>Moreover, google \"enable mixed content\" and change site settings.";
    }
    $.error(J);
    setBtn("help_show", true);
    mylog("#draw/err/" + u.substr(0, 100));
  };
  l.status = 0;
  l.timestamp = Date.now();
  App.sync();
};
CV.extraTask = function (Z) {
  let h = $.size(BOX);
  var w = CV.new(h.w, h.h);
  w.getContext("2d").drawImage(CV.main, h.x, h.y, h.w, h.h, 0, 0, h.w, h.h);
  var v = "";
  var l = App.getServer();
  v = l + "/sdapi/v1/extra-single-image";
  prompt = {
    upscaler_1: "ESRGAN_4x",
    extras_upscaler_2_visibility: 0,
    upscaling_resize: Z,
    image: w.toDataURL()
  };
  $.error("Running ESRGAN_4x to " + Z + "x... (transparency will become black)");
  post(v, prompt).then(g => {
    var x = g.image;
    if (!x.startsWith("data:")) {
      x = "data:image/png;base64," + x;
    }
    var s = new Image();
    s.onload = function () {
      w = CV.new(h.w * Z, h.h * Z);
      w.getContext("2d").drawImage(s, 0, 0, h.w * Z, h.h * Z);
      CV.loadToNew(w);
    };
    s.src = x;
  }).catch(g => {
    console.log(g);
    var x = "Error with " + CFG.server + ". Try updating AUTOMATIC1111.";
    $.error(x);
  });
};
$.onClick = function (Z) {
  var h = Z.target.closest("button");
  if (h) {
    document.getSelection().removeAllRanges();
    document.activeElement.blur();
    gButton = -1;
    var w = h.classList;
    var v = h.dataset.id;
    $.error("");
    if (v == "img_save") {
      CV.save();
    } else if (v == "img_load") {
      $("#imageLoader").click();
    } else if (v == "img_copy") {
      CV.copy();
    } else if (v == "img_paste") {
      CV.paste();
    } else if (v == "img_undo") {
      CV.undo();
    } else if (v == "img_redo") {
      CV.redo();
    } else if (v.startsWith("box_")) {
      var l = h.closest(".drawBox");
      var g = $.size(l);
      var x = App.task[parseInt(l.getAttribute("task"))];
      var s = x.prompt;
      if (x.status == 1) {
        post(App.getServer() + "/sdapi/v1/interrupt", {});
        return;
      }
      var u = false;
      var J = v == "box_retry";
      var G = v == "box_next";
      var H = v == "box_prev";
      if (v == "box_remove") {
        try {
          if (l.querySelector(".box_of").innerHTML.startsWith("0 of")) {} else if (x.out_img.length <= 1) {
            delete x.out_img;
            J = true;
          } else {
            var f = parseInt(l.getAttribute("out_img"));
            if (f == x.out_img.length - 1) {
              x.out_img.splice(f, 1);
              H = true;
            } else {
              G = true;
            }
          }
        } catch (F) {}
      }
      if (J) {
        s.n_iter = parseInt(l.querySelector(".box_retry_count").innerHTML);
        CV.sendPrompt(s, l);
        if ("init_images" in s) {
          CV.loadDataURL(CV.mainC, s.init_images[0], g.x, g.y, g.w, g.h);
        } else {
          var T = CV.new(g.w, g.h);
          var N = T.getContext("2d");
          CV.noise(N, g.w, g.h);
          CV.mainC.drawImage(T, g.x, g.y);
        }
      } else if (G) {
        if (v == "box_next") {
          var K = min(x.out_img.length - 1, parseInt(l.getAttribute("out_img")) + 1);
          if (K != f) {
            CV.loadDataURL(CV.mainC, x.out_img[K], g.x, g.y, g.w, g.h);
            l.setAttribute("out_img", K);
            l.querySelector(".box_of").innerHTML = K + 1 + " of " + x.out_img.length;
          }
        } else {
          var f = parseInt(l.getAttribute("out_img"));
          x.out_img.splice(f, 1);
          CV.loadDataURL(CV.mainC, x.out_img[f], g.x, g.y, g.w, g.h);
          l.querySelector(".box_of").innerHTML = f + 1 + " of " + x.out_img.length;
        }
      } else if (H) {
        var f = parseInt(l.getAttribute("out_img"));
        var K = max(-1, f - 1);
        if (!("init_images" in s)) {
          K = max(0, K);
        }
        if (K != f) {
          if (K >= 0) {
            CV.loadDataURL(CV.mainC, x.out_img[K], g.x, g.y, g.w, g.h);
          } else {
            CV.mainC.clearRect(g.x, g.y, g.w, g.h);
            CV.loadDataURL(CV.mainC, x.orig_img, g.x, g.y, g.w, g.h);
          }
          l.setAttribute("out_img", K);
          l.querySelector(".box_of").innerHTML = K + 1 + " of " + x.out_img.length;
        }
      } else if (v == "box_confirm") {
        CV.maskC.clearRect(g.x, g.y, g.w, g.h);
        u = true;
      } else if (v == "box_cancel") {
        CV.mainC.clearRect(g.x, g.y, g.w, g.h);
        CV.loadDataURL(CV.mainC, x.orig_img, g.x, g.y, g.w, g.h);
        u = true;
      }
      if (u) {
        delete App.task[parseInt(l.getAttribute("task"))];
        l.remove();
        $.show(BOX);
      }
    } else {
      w.toggle("active");
      setBtn(v, w.contains("active"));
    }
  }
};
document.addEventListener("click", $.onClick);
window.onbeforeunload = () => 1;
document.addEventListener("dragover", Z => {
  Z.preventDefault();
  Z.stopPropagation();
});
document.addEventListener("drop", Z => {
  Z.preventDefault();
  Z.stopPropagation();
  if (App.eeMoving) {
    $.error("Please place the last image first.");
    return;
  }
  $.error("Loading image...");
  CV.loadBlob(null, Z.dataTransfer.files[0], h => {
    CV.loadToNew(h);
  });
});
document.addEventListener("keydown", Z => {
  if (Z.repeat) {
    return;
  }
  if (Z.key.toLowerCase() == "escape") {
    App.clearDefault(Z);
    setBtn("prompt_show", false);
    setBtn("config_show", false);
    setBtn("help_show", false);
  } else if ($.type(Z.target) == "body") {
    if (Z.key.toLowerCase() == " ") {
      App.clearDefault(Z);
      toggleBtn("prompt_show");
    } else if (Z.key.toLowerCase() == "shift") {
      App.clearDefault(Z);
      toggleBtn("mask_draw");
    } else if (Z.key.toLowerCase() == "tab") {
      App.clearDefault(Z);
      toggleBtn("mask_show");
    } else if (Z.key.toLowerCase() == "`") {
      App.clearDefault(Z);
      toggleBtn("brush_draw");
    } else if (Z.key.toLowerCase() == "g") {
      App.clearDefault(Z);
      toggleBtn("grid_mode");
    } else if (Z.key.toLowerCase() == "z" && Z.ctrlKey) {
      App.clearDefault(Z);
      CV.undo();
    } else if (Z.key.toLowerCase() == "y" && Z.ctrlKey) {
      App.clearDefault(Z);
      CV.redo();
    } else if (Z.key.toLowerCase() == "s" && Z.ctrlKey) {
      App.clearDefault(Z);
      CV.save();
    } else if (Z.key.toLowerCase() == "o" && Z.ctrlKey) {
      App.clearDefault(Z);
      $("#imageLoader").click();
    }
  }
});
document.addEventListener("contextmenu", Z => {
  if ($.type(Z.target) == "textarea") {
    return;
  }
  if (Z.target.closest("#help")) {
    return;
  }
  preventDefault(Z);
});
document.addEventListener("copy", Z => {
  if ($.type(Z.target) == "body") {
    App.clearDefault(Z);
    CV.copy();
  }
});
document.addEventListener("paste", Z => {
  if ($.type(Z.target) == "body") {
    App.clearDefault(Z);
    CV.paste();
  }
});
$("#palette").addEventListener("click", function (Z) {
  var h = Z.target;
  gBrush.color = h.style.background;
  if ($.isActive("brush_draw")) {
    updateBrush(gBrush.sz);
  }
});
$("#imageLoader").addEventListener("change", Z => {
  CV.load();
}, false);
$("#tools").addEventListener("mouseenter", function (Z) {
  $.hide(BOX);
});
$("#tools").addEventListener("mouseleave", function (Z) {
  $.show(BOX);
});
$("#prompt_sampler").addEventListener("change", App.syncPrompt);
$("#prompt_fill").addEventListener("change", App.syncPrompt);
$("#prompt_model").addEventListener("change", App.syncModel);
SKETCH.addEventListener("mousedown", function (Z) {
  var v = gMouseNow.x;
  var l = gMouseNow.y;
  $.error("");
  document.getSelection().removeAllRanges();
  if (Z.target.closest(".decision_box")) {
    return;
  }
  if ($.type(Z.target) == "select") {
    return;
  }
  if (Z.button == 0) {
    if (Z.target.closest(".box_input")) {
      return;
    }
    if (Z.target.closest(".box_inputX")) {
      return;
    }
  }
  App.clearDefault(Z);
  if (App.eeMoving) {
    if (Z.button == 0) {
      var g = App.eeMoving.width;
      var s = App.eeMoving.height;
      var u = $.isActive("grid_mode") ? GRIDSZ : 1;
      v = floor(v / u) * u;
      l = floor(l / u) * u;
      var J = v;
      var G = l;
      if (Z.ctrlKey) {
        J = floor((WW - g) / 2 / GRIDSZ) * GRIDSZ;
        G = floor((HH - s) / 2 / GRIDSZ) * GRIDSZ;
      }
      CV.snapshot();
      CV.mainC.drawImage(App.eeMoving, 0, 0, g, s, J, G, g, s);
    }
    App.eeMoving.remove();
    if (Z.button == 2 && App.eeMovingRestore != null) {
      CV.mainC.drawImage(App.eeMoving, App.eeMovingRestore.x, App.eeMovingRestore.y);
    }
    App.eeMoving = null;
    App.eeMovingRestore = null;
    return;
  }
  var H = $.isActive("mask_draw");
  var f = $.isActive("brush_draw");
  if (f && Z.ctrlKey && Z.button == 0) {
    var T = CV.mainC.getImageData(v, l, 1, 1).data;
    if (T[3] > 0) {
      T = "rgb(" + T[0] + "," + T[1] + "," + T[2] + ")";
      gBrush.color = T;
      updateBrush(gBrush.sz);
    }
    return;
  }
  if (H || f) {
    CV.snapshot();
    gButton = Z.button;
    gMouseLast.x = v;
    gMouseLast.y = l;
    var N = H ? CV.maskC : CV.mainC;
    N.fillStyle = H ? "#fff" : gBrush.color;
    if (Z.button == 2) {
      N.globalCompositeOperation = "destination-out";
    }
    N.beginPath();
    N.arc(v, l, gBrush.sz / 2, 0, Math.PI * 2);
    N.fill();
    N.globalCompositeOperation = "source-over";
    if (f && Z.button == 0) {
      N = CV.maskC;
      N.fillStyle = "#fff";
      N.beginPath();
      N.arc(v, l, (gBrush.sz + 4) / 2, 0, Math.PI * 2);
      N.fill();
    }
    return;
  }
  if (gButton >= 0 && Z.button == 2) {
    gButton = -1;
    updateBOX(v, l, v, l);
  } else if (gButton == -1) {
    gButton = Z.button;
    gMouseLast.x = v;
    gMouseLast.y = l;
    updateBOX(v, l, v, l);
  } else {
    var K = $.size(BOX);
    if (gButton == 0) {
      CV.snapshot();
      console.log("send", K);
      CV.draw(K.x, K.y, K.w, K.h);
    } else {
      var A = BOX.querySelector(".box_select");
      A = A.options[A.selectedIndex].text.toLowerCase();
      A = Array.from(A).slice(1).join("");
      if (A == "erase") {
        CV.snapshot();
        CV.mainC.fillStyle = "#fff";
        CV.mainC.globalCompositeOperation = "destination-out";
        CV.mainC.fillRect(K.x, K.y, K.w, K.h);
        CV.mainC.globalCompositeOperation = "source-over";
      } else if (A == "move") {
        if (App.eeMoving) {
          $.error("Please place the last image first.");
        } else {
          var q = CV.new(K.w, K.h);
          q.getContext("2d").drawImage(CV.main, K.x, K.y, K.w, K.h, 0, 0, K.w, K.h);
          App.eeMovingRestore = {
            x: K.x,
            y: K.y
          };
          CV.loadToNew(q);
          CV.mainC.fillStyle = "#fff";
          CV.mainC.globalCompositeOperation = "destination-out";
          CV.mainC.fillRect(K.x, K.y, K.w, K.h);
          CV.mainC.globalCompositeOperation = "source-over";
        }
      } else if (A == "clone") {
        if (App.eeMoving) {
          $.error("Please place the last image first.");
        } else {
          var q = CV.new(K.w, K.h);
          q.getContext("2d").drawImage(CV.main, K.x, K.y, K.w, K.h, 0, 0, K.w, K.h);
          CV.loadToNew(q);
        }
      } else if (A == "mask" || A == "unmask") {
        CV.snapshot();
        var N = CV.maskC;
        N.fillStyle = "#fff";
        if (A == "unmask") {
          N.globalCompositeOperation = "destination-out";
        }
        N.beginPath();
        N.rect(K.x, K.y, K.w, K.h);
        N.fill();
        N.globalCompositeOperation = "source-over";
      } else if (A == "scale2x" || A == "scale3x" || A == "scale4x") {
        if (A == "scale2x") {
          CV.extraTask(2);
        }
        if (A == "scale3x") {
          CV.extraTask(3);
        }
        if (A == "scale4x") {
          CV.extraTask(4);
        }
      }
    }
    gButton = -1;
  }
});
SKETCH.addEventListener("mouseup", function (Z) {
  if ($.isActive("mask_draw") || $.isActive("brush_draw")) {
    gButton = -1;
  }
});
SKETCH.addEventListener("mouseenter", function (Z) {
  document.activeElement.blur();
});
SKETCH.addEventListener("mousemove", function (Z) {
  var h = window.getComputedStyle(SKETCH);
  var w = Z.pageX - parseFloat(h.left);
  var v = Z.pageY - parseFloat(h.top);
  gMouseNow.x = w;
  gMouseNow.y = v;
  App.mousemove(Z);
});
document.addEventListener("wheel", function (Z) {
  if ($.type(Z.target) == "select") {
    if (Z.deltaY < 0) {
      Z.target.selectedIndex = Math.max(Z.target.selectedIndex - 1, 0);
    }
    if (Z.deltaY > 0) {
      Z.target.selectedIndex = Math.min(Z.target.selectedIndex + 1, Z.target.length - 1);
    }
    if (Z.target.id.startsWith("prompt")) {
      if (Z.target.id == "prompt_model") {
        App.syncModel();
      } else {
        App.syncPrompt();
      }
    }
  }
});
SKETCH.addEventListener("wheel", function (Z) {
  if (Z.target.closest("button[data-id=\"box_retry\"]")) {
    App.clearDefault(Z);
    var h = Z.target.closest("button");
    var w = h.querySelector(".box_retry_count");
    w.innerHTML = min(99, max(1, parseInt(w.innerHTML) + sign(Z.deltaY)));
  } else if (Z.target.closest(".decision_box")) {
    App.clearDefault(Z);
    var h = Z.target.closest(".decision_box");
    try {
      if (Z.deltaY < 0) {
        h.querySelector("button[data-id=\"box_prev\"]").click();
      } else if (Z.deltaY > 0) {
        h.querySelector("button[data-id=\"box_next\"]").click();
      }
    } catch (l) {}
  } else if ($.isActive("mask_draw") || $.isActive("brush_draw")) {
    App.clearDefault(Z);
    updateBrush(gBrush.sz + sign(Z.deltaY) * 2);
  } else if (gButton == 2) {
    App.clearDefault(Z);
    try {
      var w = BOX.querySelector(".box_select");
      if (Z.deltaY < 0) {
        w.selectedIndex = Math.max(w.selectedIndex - 1, 0);
      } else if (Z.deltaY > 0) {
        w.selectedIndex = Math.min(w.selectedIndex + 1, w.length - 1);
      }
      w.dispatchEvent(new Event("change"));
    } catch (H) {}
  } else if (gButton == 0) {
    App.clearDefault(Z);
    try {
      if (Z.target.closest(".box_strength")) {
        var w = BOX.querySelector(".box_strength");
        w.value = parseFloat(w.value) + sign(Z.deltaY) * 0.05;
        w.dispatchEvent(new Event("change"));
      } else {
        var w = BOX.querySelector(".box_trial");
        w.value = parseInt(w.value) + sign(Z.deltaY);
        w.dispatchEvent(new Event("change"));
      }
    } catch (T) {}
  }
});
setBtn("grid_mode", true);
function plausible() {
  var Z = window.location;
  var h = window.document;
  var v = window.localStorage;
  var g = "https://plau.trueslow.com/api/event";
  var x = v && v.plausible_ignore;
  function J(q) {}
  function G(q, R) {
    if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(Z.hostname) || Z.protocol === "file:") {
      return J("localhost");
    }
    if (!window._phantom && !window.__nightmare && !window.navigator.webdriver && !window.Cypress) {
      if (x == "true") {
        return J("localStorage flag");
      }
      var F = {
        n: q,
        u: Z.href,
        d: "painthua.com",
        r: h.referrer || null,
        w: window.innerWidth
      };
      if (R && R.meta) {
        F.m = JSON.stringify(R.meta);
      }
      if (R && R.props) {
        F.p = JSON.stringify(R.props);
      }
      var P = new XMLHttpRequest();
      P.open("POST", g, !0);
      P.setRequestHeader("Content-Type", "text/plain");
      P.send(JSON.stringify(F));
      P.onreadystatechange = function () {
        if (P.readyState == 4 && R && R.callback) {
          R.callback();
        }
      };
    }
  }
  var H = window.plausible && window.plausible.q || [];
  window.plausible = G;
  var f;
  for (var T = 0; T < H.length; T++) {
    G.apply(this, H[T]);
  }
  function N() {
    if (f !== Z.pathname) {
      f = Z.pathname;
      G("pageview");
    }
  }
  var K;
  var A = window.history;
  if (A.pushState) {
    K = A.pushState;
    A.pushState = function () {
      K.apply(this, arguments);
      N();
    };
    window.addEventListener("popstate", N);
  }
  if (h.visibilityState === "prerender") {
    h.addEventListener("visibilitychange", function () {
      if (!f && h.visibilityState === "visible") {
        N();
      }
    });
  } else {
    N();
  }
}
plausible();