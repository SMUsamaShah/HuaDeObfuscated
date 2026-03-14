"use strict";
function mylog(eventName) {
  try {
    clicky.log(eventName);
  } catch (err) {}
}
console.img = function (url) {
  var img = new Image();
  img.onload = function () {
    console.log("%c ", "font-size:1px;padding: 64px 64px;background:url(" + url + ") no-repeat;background-size:contain;");
  };
  img.src = url;
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
window.post = function (url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};
window.gget = function (url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
function stringify(obj) {
  return JSON.stringify(obj, null, 1).replaceAll("\n ", "\n").trim();
}
function getYMDHMS() {
  var now = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var monthName = months[now.getMonth()];
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  return now.getFullYear() + "-" + monthName + "-" + (day > 9 ? "" : "0") + day + " " + [(hours > 9 ? "" : "0") + hours, (minutes > 9 ? "" : "0") + minutes, (seconds > 9 ? "" : "0") + seconds].join(":");
}
function $(selector) {
  return document.querySelector(selector);
}
function $c(el) {
  el = typeof el === "string" ? $(el) : el;
  return el.classList;
}
$.parse = function (text) {
  return text.replaceAll("L🖱️", "<img src=\"img/mouse_left.svg\" class=\"icon\">").replaceAll("R🖱️", "<img src=\"img/mouse_right.svg\" class=\"icon\">").replaceAll("🖱️wheel", "<img src=\"img/mouse_wheel.svg\" class=\"icon\">").replaceAll("🖱️", "<img src=\"img/mouse.svg\" class=\"icon\">");
};
$.type = function (el) {
  el = typeof el === "string" ? $(el) : el;
  return el.tagName.toLowerCase();
};
$.show = function (el) {
  el = typeof el === "string" ? $(el) : el;
  $c(el).remove("hide");
};
$.hide = function (el) {
  el = typeof el === "string" ? $(el) : el;
  $c(el).add("hide");
};
$.setShow = function (el, visible) {
  el = typeof el === "string" ? $(el) : el;
  if (visible) {
    $.show(el);
  } else {
    $.hide(el);
  }
};
$.isActive = function (btnId) {
  return $c("button[data-id=\"" + btnId + "\"]").contains("active");
};
$.error = function (msg) {
  $("#error_msg").innerHTML = $.parse(msg);
  if (msg == "") {
    $.hide("#error");
  } else {
    $.show("#error");
  }
};
$.top_right = function (msg) {
  $("#top_right").innerHTML = $.parse(msg);
  if (msg == "") {
    $.hide("#top_right");
  } else {
    $.show("#top_right");
  }
};
function preventDefault(evt) {
  evt.preventDefault();
}
$.size = function (el) {
  el = typeof el === "string" ? $(el) : el;
  var style = window.getComputedStyle(el);
  return {
    x: round(parseFloat(style.left)),
    y: round(parseFloat(style.top)),
    w: round(parseFloat(style.width)),
    h: round(parseFloat(style.height))
  };
};
function updateBOX(startX, startY, endX, endY) {
  var gridMode = $.isActive("grid_mode");
  var left;
  var right;
  var top;
  var bottom;
  var snapStep = gridMode ? GRIDSZ : 1;
  var maxSize = 4096;
  var minSize = min(maxSize, max(GRIDSZ, ceil(CFG.min_size / GRIDSZ) * GRIDSZ));
  if (gButton == 2) {
    minSize = gridMode ? GRIDSZ : 1;
  }
  if (gridMode || gButton == 2) {
    if (gridMode) {
      if (endX < startX && abs(endX - startX) < GRIDSZ) {
        endX = startX;
      }
      if (endY < startY && abs(endY - startY) < GRIDSZ) {
        endY = startY;
      }
    }
    if (endX >= startX) {
      left = floor(startX / snapStep) * snapStep;
      right = ceil(endX / snapStep) * snapStep;
      right = min(max(right, left + minSize), left + maxSize);
    } else {
      left = floor(endX / snapStep) * snapStep;
      right = ceil(startX / snapStep) * snapStep;
      left = max(min(left, right - minSize), right - maxSize);
    }
    if (endY >= startY) {
      top = floor(startY / snapStep) * snapStep;
      bottom = ceil(endY / snapStep) * snapStep;
      bottom = min(max(bottom, top + minSize), top + maxSize);
    } else {
      top = floor(endY / snapStep) * snapStep;
      bottom = ceil(startY / snapStep) * snapStep;
      top = max(min(top, bottom - minSize), bottom - maxSize);
    }
  } else {
    if (endX >= startX) {
      left = startX;
      right = ceil((endX - startX) / GRIDSZ) * GRIDSZ + startX;
      right = min(max(right, left + minSize), left + maxSize);
    } else {
      left = floor((endX - startX) / GRIDSZ) * GRIDSZ + startX;
      right = startX;
      left = max(min(left, right - minSize), right - maxSize);
    }
    if (endY >= startY) {
      top = startY;
      bottom = ceil((endY - startY) / GRIDSZ) * GRIDSZ + startY;
      bottom = min(max(bottom, top + minSize), top + maxSize);
    } else {
      top = floor((endY - startY) / GRIDSZ) * GRIDSZ + startY;
      bottom = startY;
      top = max(min(top, bottom - minSize), bottom - maxSize);
    }
  }
  BOX.style.left = left + "px";
  BOX.style.top = top + "px";
  BOX.style.width = right - left + "px";
  BOX.style.height = bottom - top + "px";
}
var CV = {
  changed: true
};
CV.save = function () {
  var canvas = null;
  if (!$.isActive("mask_draw") && !$.isActive("brush_draw") && gButton == 2) {
    var boxSize = $.size(BOX);
    canvas = CV.new(boxSize.w, boxSize.h);
    canvas.getContext("2d").drawImage(CV.main, boxSize.x, boxSize.y, boxSize.w, boxSize.h, 0, 0, boxSize.w, boxSize.h);
  } else {
    canvas = CV.trim(CV.mainC);
    if (!canvas) {
      $.error("Canvas is empty.");
      return;
    }
  }
  var link = $("#save_canvas");
  link.setAttribute("download", "Hua " + getYMDHMS() + ".png");
  link.setAttribute("href", canvas.toDataURL("image/png"));
  link.click();
};
CV.loadBlob = function (ctx, blob, callback = null) {
  var img = new Image();
  img.onload = function () {
    var imgW = img.width;
    var imgH = img.height;
    if (ctx == null) {
      ctx = CV.new(imgW, imgH).getContext("2d");
    }
    ctx.drawImage(img, 0, 0, imgW, imgH, 0, 0, imgW, imgH);
    URL.revokeObjectURL(img.src);
    if (callback) {
      callback(ctx.canvas);
    }
  };
  img.onerror = function (imgW) {
    $.error("Invalid image file.");
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(blob);
};
CV.loadDataURL = function (ctx, dataUrl, dx, dy, dw, dh) {
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, dx, dy, dw, dh);
  };
  img.src = dataUrl;
};
CV.load = function () {
  if (App.eeMoving) {
    $.error("Please place the last image first.");
    return;
  }
  $.error("Loading image...");
  CV.loadBlob(null, $("#imageLoader").files[0], canvas => {
    CV.loadToNew(canvas);
  });
};
CV.loadToNew = function (canvas) {
  canvas.style.left = gMouseNow.x + "px";
  canvas.style.top = gMouseNow.y + "px";
  SKETCH.appendChild(canvas);
  App.eeMoving = canvas;
  $.error("L🖱️ to place, Ctrl+L🖱️ to place at center of canvas, R🖱️ to cancel.");
};
CV.copy = function () {
  var canvas = null;
  if (!$.isActive("mask_draw") && !$.isActive("brush_draw") && gButton == 2) {
    var boxSize = $.size(BOX);
    canvas = CV.new(boxSize.w, boxSize.h);
    canvas.getContext("2d").drawImage(CV.main, boxSize.x, boxSize.y, boxSize.w, boxSize.h, 0, 0, boxSize.w, boxSize.h);
  } else {
    canvas = CV.trim(CV.mainC);
    if (!canvas) {
      $.error("Canvas is empty.");
      return;
    }
  }
  canvas.toBlob(async blob => {
    try {
      await navigator.clipboard.write([new ClipboardItem({
        [blob.type]: blob
      })]);
      $.error("Copied to clipboard.");
    } catch (err) {
      console.log(err);
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
    const clipItems = await navigator.clipboard.read();
    for (const clipItem of clipItems) {
      var isImage = false;
      for (const mimeType of clipItem.types) {
        if (mimeType === "image/png") {
          isImage = true;
          CV.loadBlob(null, await clipItem.getType(mimeType), canvas => {
            CV.loadToNew(canvas);
          });
        }
      }
      if (!isImage) {
        $.error("Clipboard does not contain image.");
      }
    }
  } catch (err) {
    console.log(err);
    $.error("This browser cannot access clipboard. Try Chrome, or open the image file instead.");
  }
};
CV.snapshot = function () {
  if (!CV.changed) {
    for (let ctx of [CV.mainC, CV.maskC]) {
      let canvas = ctx.canvas;
      if (canvas.snapshotIndex + 1 < canvas.snapshot.length) {
        canvas.snapshot.length = canvas.snapshotIndex + 1;
      }
    }
    CV.changed = true;
  } else {
    for (let ctx of [CV.mainC, CV.maskC]) {
      let canvas = ctx.canvas;
      canvas.toBlob(blob => {
        if ("snapshot" in canvas) {
          canvas.snapshotIndex += 1;
          if (canvas.snapshotIndex > 9) {
            canvas.snapshot.shift();
            canvas.snapshotIndex = 9;
          }
          if (canvas.snapshotIndex < canvas.snapshot.length) {
            canvas.snapshot.length = canvas.snapshotIndex;
          }
          canvas.snapshot.push(blob);
        } else {
          canvas.snapshotIndex = 0;
          canvas.snapshot = [blob];
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
  for (let ctx of [CV.mainC, CV.maskC]) {
    let canvas = ctx.canvas;
    try {
      if (canvas.snapshotIndex == canvas.snapshot.length - 1 && CV.changed) {
        canvas.toBlob(blob => {
          canvas.snapshot.push(blob);
          CV.changed = false;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          CV.loadBlob(ctx, canvas.snapshot[canvas.snapshotIndex]);
        });
      } else {
        if (canvas.snapshotIndex <= 0) {
          $.error("Undo limit reached.");
          return;
        }
        canvas.snapshotIndex -= 1;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        CV.loadBlob(ctx, canvas.snapshot[canvas.snapshotIndex]);
      }
    } catch (err) {}
  }
};
CV.redo = function () {
  for (let ctx of [CV.mainC, CV.maskC]) {
    let canvas = ctx.canvas;
    if (!("snapshot" in canvas)) {
      $.error("Nothing to redo.");
      return;
    }
    if (canvas.snapshotIndex >= canvas.snapshot.length - 1) {
      $.error("This is already the latest canvas.");
      return;
    }
    try {
      canvas.snapshotIndex += 1;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      CV.loadBlob(ctx, canvas.snapshot[canvas.snapshotIndex]);
    } catch (err) {}
  }
};
CV.noise = function (ctx, width, height) {
  var imageData = ctx.createImageData(128, 128);
  var pixels = new Uint8Array(imageData.data.buffer);
  for (var col = 0; col < width; col += 128) {
    for (var row = 0; row < height; row += 128) {
      window.crypto.getRandomValues(pixels);
      for (var i = 0; i < pixels.length; i += 4) {
        pixels[i + 3] = 255;
      }
      ctx.putImageData(imageData, col, row);
    }
  }
};
CV.grid = function (ctx) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  for (var col = 0; col < width / GRIDSZ; col++) {
    for (var row = 0; row < height / GRIDSZ; row++) {
      ctx.fillStyle = (col + row) % 2 == 0 ? "#2f2f2f" : "#282828";
      ctx.fillRect(col * GRIDSZ, row * GRIDSZ, GRIDSZ, GRIDSZ);
    }
  }
};
CV.trim = function (ctx) {
  var bounds = CV.getTrimSize(ctx);
  if (bounds.w == 0 || bounds.h == 0) {
    return null;
  }
  var canvas = CV.new(bounds.w, bounds.h);
  canvas.getContext("2d").drawImage(ctx.canvas, bounds.x, bounds.y, bounds.w, bounds.h, 0, 0, bounds.w, bounds.h);
  return canvas;
};
CV.getTrimSize = function (ctx) {
  function isRowEmpty(imageData, width, row) {
    for (var col = 0; col < width; ++col) {
      if (imageData.data[row * width * 4 + col * 4 + 3] !== 0) {
        return false;
      }
    }
    return true;
  }
  function isColEmpty(imageData, width, col, rowStart, rowEnd) {
    for (var row = rowStart; row < rowEnd; ++row) {
      if (imageData.data[row * width * 4 + col * 4 + 3] !== 0) {
        return false;
      }
    }
    return true;
  }
  var canvas = ctx.canvas;
  var width = canvas.width;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var top = 0;
  var bottom = imageData.height;
  var left = 0;
  var right = imageData.width;
  while (top < bottom && isRowEmpty(imageData, width, top)) {
    ++top;
  }
  while (bottom - 1 > top && isRowEmpty(imageData, width, bottom - 1)) {
    --bottom;
  }
  while (left < right && isColEmpty(imageData, width, left, top, bottom)) {
    ++left;
  }
  while (right - 1 > left && isColEmpty(imageData, width, right - 1, top, bottom)) {
    --right;
  }
  return {
    x: left,
    y: top,
    w: right - left,
    h: bottom - top
  };
};
CV.new = function (width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
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
function updateBrush(size) {
  var minSize = 5;
  size = min(max(size, minSize), 128);
  gBrush.sz = size;
  const canvas = CV.new(size, size);
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = minSize;
  ctx.strokeStyle = $.isActive("mask_draw") ? "#000" : gBrush.color;
  ctx.arc(size / 2, size / 2, (size - minSize) / 2, 0, Math.PI * 2);
  ctx.stroke();
  canvas.toBlob(function (blob) {
    if (gBrush.url) {
      URL.revokeObjectURL(gBrush.url);
    }
    gBrush.url = URL.createObjectURL(blob);
    SKETCH.style.cursor = "url(" + gBrush.url + ") " + size / 2 + " " + size / 2 + ", auto";
  });
}
App.mousemove = evt => {
  var mouseX = gMouseNow.x;
  var mouseY = gMouseNow.y;
  if (App.eeMoving) {
    var snapStep = $.isActive("grid_mode") ? GRIDSZ : 1;
    mouseX = floor(mouseX / snapStep) * snapStep;
    mouseY = floor(mouseY / snapStep) * snapStep;
    App.eeMoving.style.left = mouseX + "px";
    App.eeMoving.style.top = mouseY + "px";
    return;
  }
  var isMaskDraw = $.isActive("mask_draw");
  var isBrushDraw = $.isActive("brush_draw");
  if (isBrushDraw && evt.ctrlKey) {
    var pixel = CV.mainC.getImageData(mouseX, mouseY, 1, 1).data;
    if (pixel[3] > 0) {
      pixel = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")";
      gBrush.color = pixel;
      updateBrush(gBrush.sz);
    }
    return;
  }
  if (isMaskDraw || isBrushDraw) {
    if (gButton < 0) {
      return;
    } else {
      var ctx = isMaskDraw ? CV.maskC : CV.mainC;
      ctx.lineWidth = gBrush.sz;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.strokeStyle = isMaskDraw ? "#fff" : gBrush.color;
      if (gButton == 2) {
        ctx.globalCompositeOperation = "destination-out";
      }
      ctx.beginPath();
      ctx.moveTo(gMouseLast.x, gMouseLast.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      if (isBrushDraw && gButton == 0) {
        ctx = CV.maskC;
        ctx.lineWidth = gBrush.sz + 4;
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(gMouseLast.x, gMouseLast.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
      gMouseLast.x = mouseX;
      gMouseLast.y = mouseY;
    }
    return;
  }
  if (gButton < 0) {
    updateBOX(mouseX, mouseY, mouseX, mouseY);
  } else {
    updateBOX(gMouseLast.x, gMouseLast.y, mouseX, mouseY);
  }
};
function setBtn(btnId, active, withSideEffects = true) {
  if (active) {
    $c("button[data-id=" + btnId + "]").add("active");
  } else {
    $c("button[data-id=" + btnId + "]").remove("active");
  }
  if (btnId == "help_show") {
    if (active) {
      App.helpSeen = true;
    }
    $.setShow("#help", active);
  } else if (btnId == "prompt_show") {
    onJSONblur({
      target: $("#prompt")
    });
    $.setShow("#prompt_wrap", active);
    setTimeout(function () {
      $("#prompt").focus();
    }, 0);
  } else if (btnId == "config_show") {
    $.setShow("#config_wrap", active);
    setTimeout(function () {
      $("#config").focus();
    }, 0);
  } else if (btnId == "palette_show") {
    $.setShow("#palette", active);
    if (withSideEffects) {
      if (active) {
        if (!$.isActive("brush_draw")) {
          setBtn("brush_draw", true);
        }
      }
    }
  } else if (btnId == "mask_show") {
    $.setShow(CV.mask, active);
    if (withSideEffects) {
      App.userMaskActive = active;
      if (!active) {
        if ($.isActive("mask_draw")) {
          setBtn("mask_draw", false);
        }
      }
    }
  } else if (btnId == "mask_draw") {
    if (active) {
      setBtn("brush_draw", false);
      updateBrush(gBrush.sz);
      setBtn("mask_show", true);
    } else {
      SKETCH.style.cursor = "crosshair";
    }
  } else if (btnId == "brush_draw") {
    if (active) {
      setBtn("mask_show", false);
      setBtn("mask_draw", false);
      setBtn("palette_show", true);
      updateBrush(gBrush.sz);
    } else {
      setBtn("palette_show", false);
      SKETCH.style.cursor = "crosshair";
    }
  } else if (btnId == "error_close") {
    $.error("");
  } else if (btnId == "grid_mode") {
    if (gMouseNow.x != -1 && gMouseNow.y != -1) {
      App.mousemove({});
    }
  }
}
function toggleBtn(btnId) {
  setBtn(btnId, !$.isActive(btnId));
}
App.setObj = function (key, value) {
  localStorage.setItem("HUA_V1_" + key, JSON.stringify(value));
};
App.getObj = function (key) {
  try {
    var value = JSON.parse(localStorage.getItem("HUA_V1_" + key));
    if (value) {
      return value;
    } else {
      return {};
    }
  } catch (err) {
    return {};
  }
};
App.readStatus = function () {
  var prompt = Object.assign({
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
  App.setObj("PROMPT", prompt);
  App.setObj("CONFIG", CFG);
  $("#prompt").value = stringify(prompt);
  $("#config").value = stringify(CFG);
};
App.readStatus();
$("#prompt").setSelectionRange(13, 13);
App.clearDefault = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
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
  var url = "http://" + CFG.server;
  if (CFG.server.startsWith("https://") || CFG.server.startsWith("http://")) {
    url = CFG.server;
  }
  url = url.trim();
  if (url.endsWith("/")) {
    url = url.substring(0, url.length - 1);
  }
  return url;
};
App.sync = function () {
  try {
    for (var taskId in App.task) {
      taskId = parseInt(taskId);
      var task = App.task[taskId];
      if (task.status == -1 || task.status == 1) {
        throw new Error();
      }
    }
    var earliest = -1;
    var now = Date.now();
    for (var taskId in App.task) {
      taskId = parseInt(taskId);
      var task = App.task[taskId];
      if (task.status == 0 && task.timestamp < now) {
        earliest = taskId;
        now = task.timestamp;
      }
    }
    if (earliest != -1) {
      var task = App.task[earliest];
      task.status = 1;
      post(task.URL, task.prompt).then(err => task.funGood(err)).catch(err => task.funBad(err));
    }
  } catch (err) {}
  var boxPos = $.size(BOX);
  var strHtml = "";
  var promptHtml = "";
  if (gButton < 0) {
    strHtml = "L🖱️ generate, R🖱️ functions";
  } else if (gButton == 0) {
    var prompt = JSON.parse($("#prompt").value);
    strHtml = "L🖱️ run, R🖱️ cancel, <span class=\"box_input\">run<input type=\"number\" class=\"box_trial\" style=\"width:2.6em;height:2em;font-weight:bold\" value=\"1\">\n    , str<input type=\"number\" class=\"box_strength\" style=\"width:3.6em;height:2em;font-weight:bold\" value=\"" + prompt.denoising_strength + "\" step=\"0.05\"></span>";
    try {
      prompt.denoising_strength = parseFloat(BOX.querySelector(".box_strength").value);
    } catch (err) {}
    promptHtml = stringify(prompt).replace("{\n\"", "<span style=\"color:#aaa;\">").replace("\n}", "</span>").replaceAll("\": \"", "</span> <span style=\"color:#eee;\">").replaceAll("\": ", "</span> <span style=\"color:#eee;\">").replaceAll("\",\n\"", "</span>\n<span style=\"color:#aaa;\">").replaceAll(",\n\"", "</span>\n<span style=\"color:#aaa;\">").trim().replaceAll("\n", "<br>");
  } else {
    strHtml = "<select class=\"box_select\">\n    <option>🧹Erase</option><option>🍀Move</option><option>👯Clone</option>\n    <option>🌟Scale2x</option><option>🌟Scale3x</option><option>🌟Scale4x</option>\n    <option>🌑Mask</option><option>🌕Unmask</option>\n    </select> <span>L🖱️ confirm, R🖱️ cancel</span>";
  }
  strHtml = $.parse(strHtml);
  var strEl = BOX.querySelector(".box_str");
  if (strHtml != strEl.innerHTML) {
    strEl.innerHTML = strHtml;
  }
  strEl = BOX.querySelector(".box_prompt");
  if (promptHtml != strEl.innerHTML) {
    strEl.innerHTML = promptHtml;
  }
  BOX.querySelector(".box_remark").innerHTML = boxPos.w + "x" + boxPos.h;
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
    BOX.querySelector(".box_trial").onchange = function (inputEvt) {
      var inputEl = inputEvt.target;
      inputEl.value = min(99, max(1, parseInt(inputEl.value)));
    };
    BOX.querySelector(".box_strength").onchange = function (inputEvt) {
      var inputEl = inputEvt.target;
      inputEl.value = round(min(1, max(0.05, parseFloat(inputEl.value))) * 20) / 20;
    };
  } catch (err2) {}
  try {
    BOX.querySelector(".box_select").onchange = function (err2) {
      var sel = err2.target;
      sel = sel.options[sel.selectedIndex].text.toLowerCase();
      sel = Array.from(sel).slice(1).join("");
      if (sel == "mask" || sel == "unmask") {
        setBtn("mask_show", true, false);
      } else {
        setBtn("mask_show", App.userMaskActive, false);
      }
    };
  } catch (err3) {}
  try {
    var genstatCount = document.querySelectorAll(".box_genstat").length;
    if (genstatCount > 0) {
      var taskIds = Object.keys(App.task).sort((taskId, taskIdB) => Math.sign(App.task[taskId].timestamp - App.task[taskIdB].timestamp));
      var queueIndex = 0;
      for (var idx = 0; idx < taskIds.length; idx++) {
        var taskId = taskIds[idx];
        var taskBox = $(".drawBox[task=\"" + taskId + "\"]");
        var boxPos = $.size(taskBox);
        var strEl = taskBox.querySelector(".box_genstat");
        if (strEl) {
          var progressPct = "?";
          var etaSec = "?";
          var prog = App.progress;
          if (queueIndex == 0 && prog.progress != 0) {
            progressPct = Math.abs(parseFloat(prog.progress));
            etaSec = Math.round(Math.abs(parseFloat(prog.eta_relative)));
            if (progressPct == 1) {
              App.progress = {
                progress: 0
              };
            }
            if (prog.current_image) {
              var curImg = prog.current_image;
              if (App.progImgBak != curImg) {
                App.progImgBak = curImg;
                if (!curImg.startsWith("data:")) {
                  curImg = "data:image/png;base64," + curImg;
                }
                CV.loadDataURL(CV.mainC, curImg, boxPos.x, boxPos.y, boxPos.w, boxPos.h);
              }
            }
          }
          strEl.innerHTML = "<span class=\"box_progress\" style=\"color:#0f0;\">" + (progressPct == "?" ? "?" : Math.round(progressPct * 100)) + "%</span> of " + App.task[taskId].prompt.n_iter + " (" + etaSec + "s) queue <span style=\"color:#0f0;\">" + (queueIndex + 1) + "</span> / " + genstatCount;
          queueIndex += 1;
        }
      }
    }
  } catch (err2) {
    console.log(err2);
  }
};
App.syncA1111 = function () {
  var serverUrl = App.getServer();
  try {
    gget(serverUrl + "/sdapi/v1/options").then(data => {
      App.optionNow = data;
      App.modelTarget = App.optionNow.sd_model_checkpoint;
      try {
        $("#prompt_model").selectedIndex = App.sd_models.findIndex(function (item) {
          return item.title == App.optionNow.sd_model_checkpoint;
        });
      } catch (modelIdx) {}
    }).catch(data => {});
    gget(serverUrl + "/sdapi/v1/samplers").then(data => {
      if (JSON.stringify(App.samplers) != JSON.stringify(data)) {
        App.samplers = data;
        var optionsHtml = "";
        for (var item of data) {
          optionsHtml += "<option>" + item.name + "</option>";
        }
        $("#prompt_sampler").innerHTML = optionsHtml;
        onJSONblur({
          target: $("#prompt")
        });
      }
    }).catch(data => {});
    gget(serverUrl + "/sdapi/v1/sd-models").then(data => {
      if (JSON.stringify(App.sd_models) != JSON.stringify(data)) {
        App.sd_models = data;
        var optionsHtml = "";
        for (var item of data) {
          optionsHtml += "<option>" + item.title + "</option>";
        }
        $("#prompt_model").innerHTML = optionsHtml;
        try {
          $("#prompt_model").selectedIndex = App.sd_models.findIndex(function (modelIdx) {
            return modelIdx.title == App.optionNow.sd_model_checkpoint;
          });
        } catch (modelIdx) {}
      }
    }).catch(data => {});
  } catch (data) {}
};
App.syncProgress = function () {
  var serverUrl = App.getServer();
  var allIdle = true;
  for (taskIdA in App.task) {
    if (App.task[taskIdA].status == 1) {
      allIdle = false;
    }
  }
  if (allIdle) {
    return;
  }
  var skipImg = true;
  try {
    var taskIds = Object.keys(App.task).sort((taskIdA, taskIdB) => Math.sign(App.task[taskIdA].timestamp - App.task[taskIdB].timestamp));
    var task = App.task[taskIds[0]];
    if (task.prompt.width == 512 && task.prompt.height == 512) {
      skipImg = false;
    }
  } catch (safeCheck) {}
  try {
    let safeCheck = App.progSafeCheck;
    gget(serverUrl + ("/sdapi/v1/progress?skip_current_image=" + skipImg)).then(data => {
      if (safeCheck == App.progSafeCheck) {
        App.progress = data;
      } else {}
    }).catch(data => {});
  } catch (data) {}
};
App.syncPrompt = function () {
  var prompt = JSON.parse($("#prompt").value);
  var el = null;
  el = $("#prompt_sampler");
  prompt.sampler_index = el.options[el.selectedIndex].text;
  el = $("#prompt_fill");
  prompt.inpainting_fill = el.selectedIndex;
  $("#prompt").value = stringify(prompt);
  onJSONblur({
    target: $("#prompt")
  });
};
App.syncModel = () => {
  try {
    var serverUrl = App.getServer();
    var modelEl = $("#prompt_model");
    if (App.modelTarget != modelEl.options[modelEl.selectedIndex].text) {
      App.modelTarget = modelEl.options[modelEl.selectedIndex].text;
      let modelName = App.modelTarget;
      post(serverUrl + "/sdapi/v1/options", {
        sd_model_checkpoint: modelName
      }).then(res => {
        if (modelName == App.modelTarget) {
          $.top_right("");
        }
      }).catch(res => {
        if (modelName == App.modelTarget) {
          $.top_right("");
        }
        $.error("Cannot switch model.");
      });
      $.top_right("Switching to " + modelName + "...");
    }
  } catch (modelIdx) {}
};
$("#help").innerHTML = $.parse("\nPaintHua.com is 100% free. It can connect to your local A1111 via its API.\n<ul>\n<li>Update A1111 to LATEST version with git pull. Chrome browser recommended (Brave shield will block A1111 because it's HTTP).</li>\n<li><span style=\"color:gold\">set COMMANDLINE_ARGS=--api --cors-allow-origins=https://www.painthua.com</span> in webui-user.bat.</li>\n<li>A1111 settings: use <a href=\"https://huggingface.co/runwayml/stable-diffusion-inpainting\" target=\"_blank\">sd-v1.5-inpainting</a> model, turn off \"Apply color correction to img2img results\", and set \"Inpainting conditioning mask strength\" to 1.</li>\n<li>Add --listen if you need LAN access. When connecting to IP other than 127.0.0.1, google \"enable mixed content\" and change site settings (because A1111 is HTTP instead of HTTPS).</li>\n<li>PaintHua can connect to colab. <a href=\"https://github.com/BlinkDL/Hua\" targe=\"_blank\">Click for guide.</a></li>\n</ul>\n<br>Tips:&nbsp; <a href=\"https://discord.gg/y9kMYtjgFZ\" target=\"_blank\">Discord (help you 🙋)</a>\n&nbsp;<a href=\"https://www.youtube.com/watch?v=OAoQLFzPABY\" target=\"_blank\">Youtube Guide</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV16e4y1a7ne\" target=\"_blank\">B站教程</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV15R4y1f7sh\" target=\"_blank\">整合包1</a>\n&nbsp;<a href=\"https://www.bilibili.com/video/BV1dP411g7YN\" target=\"_blank\">整合包2</a>\n&nbsp;<a href=\"https://gigazine.net/news/20221113-hua-stable-diffusion-outpainting/\" target=\"_blank\">使い方</a>\n&nbsp;<a href=\"https://github.com/BlinkDL/Hua\" target=\"_blank\">Github</a>\n<ul><li><span style=\"color:gold\">Set canvas size in Config (0 means window size, 4096 max). Close config and refresh page to apply.</span></li>\n<li>Space: prompt. Tab: toggle mask. ESC: close info banner or textbox. G: toggle grid mode.</li>\n<li>Prompt \"inpainting_fill\": 0=fill, 1=original, 2=latentNoise, 3=latentNothing. <span style=\"color:gold\">Some can reduce seams.</span></li>\n</ul>\n<br>Normal mode (for txt2img / inpainting / outpainting)\n<ul><li>L🖱️ generate. Move 🖱️ (don't hold L🖱️) to adjust size, 🖱️wheel for #trials, L🖱️ again to confirm.</li>\n<li>🖱️wheel to browse results (move 🖱️ to bottom of box to hide buttons). 🖱️wheel on [+1] for [+more].</li>\n<li>R🖱️ functions. 🖱️wheel to switch function. Ctrl+C/S is restricted to the box.</li></ul>\n<br>Mask mode (hotkey: Shift) (🖱️wheel for brush size)\n<ul><li>L🖱️ draw mask for inpainting. For doing inpainting, switch to normal mode and draw a large box covering both masked regions and relevant image context.</li>\n<li>R🖱️ erase mask. The mask is also automatically erased when you accept a box.</li></ul>\n<br>Brush mode (hotkey: `) (🖱️wheel for brush size)\n<ul><li>L🖱️ paint, R🖱️ erase. All affected regions are automatically masked. Try drawing some colors and inpaint on top of them.</li>\n<li>Ctrl+L🖱️ (or Ctrl+move 🖱️) pick color from canvas.</li></ul>\n<br>i2i (img2img) mode: This will ignore mask. Good for improving upscaled images and brush sketches.\n<br><br>Troubleshoot: <a href=\"#\" style=\"margin:0 1em\" onclick=\"App.resetPrompt()\">reset prompt</a> <a href=\"#\" onclick=\"App.resetConfig()\">reset config</a>\n");
var gPalette = "000000 222034 45283c 663931 8f563b df7126 d9a066 eec39a fbf236 99e550 6abe30 37946e 4b692f 8f974a 8a6f30 524b24 323c39 3f3f74 306082 5b6ee1 639bff 5fcde4 cbdbfc ffffff 9badb7 847e87 696a6a 595652 76428a d77bba d95763 ac3232".split(" ");
var paletteHtml = "";
for (var colorHex of gPalette) {
  paletteHtml += "<span style=\"background:#" + colorHex + ";\" class=\"unselectable\"></span>";
}
$("#palette").innerHTML = paletteHtml;
var gBrush = {
  sz: 64,
  url: null,
  color: "#eec39a"
};
function onJSONblur(evt) {
  var input = evt.target;
  var key = input.id.toUpperCase();
  try {
    var obj = JSON.parse(input.value);
    input.value = stringify(obj);
    App.setObj(key, obj);
    App.readStatus();
    $.error("");
  } catch (parseErr) {
    $.error(key + " is not a valid JSON. Please check its format.");
  }
  if (key == "PROMPT") {
    try {
      var prompt = JSON.parse($("#prompt").value);
      $("#prompt_sampler").selectedIndex = App.samplers.findIndex(function (err) {
        return err.name.toLowerCase() == prompt.sampler_index.toLowerCase();
      });
      $("#prompt_fill").selectedIndex = parseInt(prompt.inpainting_fill);
    } catch (err) {}
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
CV.draw = function (boxX, boxY, boxW, boxH) {
  let settings = {};
  try {
    settings = JSON.parse($("#prompt").value);
    $.error("");
  } catch (err3) {
    $.error("Prompt invalid. Please check its format.");
    return;
  }
  var tmpCanvas = CV.new(boxW, boxH);
  var tmpCtx = tmpCanvas.getContext("2d", {
    willReadFrequently: true
  });
  tmpCtx.drawImage(CV.main, boxX, boxY, boxW, boxH, 0, 0, boxW, boxH);
  var origImg = tmpCanvas.toDataURL();
  tmpCtx.fillStyle = "#fff";
  tmpCtx.fillRect(0, 0, boxW, boxH);
  var isBlank = true;
  var mainPixels = new Uint32Array(CV.mainC.getImageData(boxX, boxY, boxW, boxH).data.buffer);
  var maskImgData = tmpCtx.getImageData(0, 0, boxW, boxH);
  var maskPixels = new Uint32Array(maskImgData.data.buffer);
  var seamRadius = CFG.seam_fix_radius;
  for (var pixIdx = 0; pixIdx < mainPixels.length; pixIdx++) {
    if (mainPixels[pixIdx] >> 24 == -1) {
      isBlank = false;
      maskPixels[pixIdx] = 4278190080;
      if (seamRadius > 0) {
        var pixCol = pixIdx % boxW;
        for (var r = 1; r <= seamRadius; r++) {
          if (pixCol - r >= 0 && mainPixels[pixIdx - r] >> 24 != -1) {
            break;
          }
          if (pixCol + r < boxW && mainPixels[pixIdx + r] >> 24 != -1) {
            break;
          }
          if (pixIdx - boxW * r >= 0 && mainPixels[pixIdx - boxW * r] >> 24 != -1) {
            break;
          }
          if (pixIdx + boxW * r < mainPixels.length && mainPixels[pixIdx + boxW * r] >> 24 != -1) {
            break;
          }
          if (r == seamRadius) {
            r = seamRadius + 1;
            break;
          }
        }
        r = seamRadius + 1 - r;
        if (r > 0) {
          maskPixels[pixIdx] = 4278190080 + floor(r * 255 / (seamRadius + 1)) * 65793;
        }
      }
    }
  }
  tmpCtx.putImageData(maskImgData, 0, 0);
  if (seamRadius > 0) {
    tmpCtx.globalCompositeOperation = "lighten";
    tmpCtx.drawImage(tmpCanvas, -seamRadius, 0);
    tmpCtx.drawImage(tmpCanvas, seamRadius, 0);
    tmpCtx.drawImage(tmpCanvas, 0, -seamRadius);
    tmpCtx.drawImage(tmpCanvas, 0, seamRadius);
    tmpCtx.globalCompositeOperation = "source-over";
  }
  App.sync();
  settings = Object.assign(settings, {
    width: boxW,
    height: boxH,
    n_iter: parseInt(BOX.querySelector(".box_trial").value),
    denoising_strength: parseFloat(BOX.querySelector(".box_strength").value),
    include_init_images: false
  });
  if (isBlank && !$.isActive("i2i_mode")) {
    CV.noise(tmpCtx, boxW, boxH);
    CV.mainC.drawImage(tmpCanvas, boxX, boxY);
    settings = Object.assign(settings, {
      denoising_strength: 1
    });
    mylog("#draw/txt2img/" + boxW + "/" + boxH);
  } else {
    tmpCtx.drawImage(CV.mask, boxX, boxY, boxW, boxH, 0, 0, boxW, boxH);
    var maskDataUrl = tmpCanvas.toDataURL();
    CV.noise(tmpCtx, boxW, boxH);
    tmpCtx.drawImage(CV.main, boxX, boxY, boxW, boxH, 0, 0, boxW, boxH);
    var initImgDataUrl = tmpCanvas.toDataURL();
    if (!$.isActive("i2i_mode")) {
      console.img(maskDataUrl);
    }
    console.img(initImgDataUrl);
    CV.mainC.drawImage(tmpCanvas, boxX, boxY);
    settings = Object.assign(settings, {
      mask: maskDataUrl,
      init_images: [initImgDataUrl]
    });
    if ($.isActive("i2i_mode")) {
      delete settings.mask;
    }
    mylog("#draw/img2img/" + boxW + "/" + boxH);
  }
  try {
    var cloneBox = BOX.cloneNode(true);
    $.hide(cloneBox.querySelector(".box_prompt"));
    cloneBox.classList.add("border_dance");
    var taskId = 0;
    try {
      var taskKeys = Array.from(Object.keys(App.task)).map(Number);
      if (taskKeys.length > 0) {
        taskId = max(...taskKeys) + 1;
      }
    } catch (err) {}
    App.task[taskId] = {
      status: -1,
      timestamp: 1e+99,
      prompt: settings,
      orig_img: origImg
    };
    cloneBox.setAttribute("task", taskId);
    SKETCH.appendChild(cloneBox);
    CV.sendPrompt(settings, cloneBox);
  } catch (err2) {
    console.log(err2);
    var errMsg = err2.toString();
    mylog("#draw/err/" + errMsg.substr(0, 100));
  }
};
CV.sendPrompt = function (prompt, boxEl) {
  boxEl.querySelector(".box_str").innerHTML = "Generating... <span class=\"box_genstat\"></span><br>" + stringify(prompt.prompt).replaceAll("\n", "<br> ").replaceAll("\"", "") + "<div class=\"box_inputX\" style=\"display:flex;align-items:center;width:min-content;\">\n    <button type=\"button\" data-id=\"box_cancel\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">❌</span></button>\n    </div>";
  boxEl.querySelector(".box_inputX").addEventListener("mouseenter", function (resultData) {
    $.hide(BOX);
  });
  boxEl.querySelector(".box_inputX").addEventListener("mouseleave", function (resultData) {
    $.show(BOX);
  });
  let url = $.size(boxEl);
  let taskId = parseInt(boxEl.getAttribute("task"));
  let task = App.task[taskId];
  var serverUrl = App.getServer();
  if ("init_images" in prompt) {
    serverUrl = serverUrl + "/sdapi/v1/img2img";
  } else {
    serverUrl = serverUrl + "/sdapi/v1/txt2img";
  }
  task.URL = serverUrl;
  function cancelFn() {
    CV.mainC.clearRect(url.x, url.y, url.w, url.h);
    CV.loadDataURL(CV.mainC, task.orig_img, url.x, url.y, url.w, url.h);
    boxEl.remove();
    boxEl = null;
  }
  task.funGood = resultData => {
    task.status = 2;
    task.timestamp = 1e+99;
    App.progSafeCheck += 1;
    App.progress = {
      progress: 0
    };
    if (!("images" in resultData)) {
      if ("detail" in resultData) {
        $.error(resultData.detail.substr(0, 100));
      } else {
        $.error(CFG.server + " generation failed. try [reset prompt] in [Help].");
      }
      cancelFn();
      return;
    }
    var imgIdx = -1;
    for (var imgDataUrl of resultData.images) {
      if (!imgDataUrl.startsWith("data:")) {
        imgDataUrl = "data:image/png;base64," + imgDataUrl;
      }
      var startImgIdx = 0;
      if (!("out_img" in task)) {
        task.out_img = [imgDataUrl];
      } else {
        startImgIdx = parseInt(boxEl.getAttribute("out_img")) + 1;
        task.out_img.splice(startImgIdx, 0, imgDataUrl);
      }
      if (imgIdx == -1) {
        imgIdx = startImgIdx;
        CV.loadDataURL(CV.mainC, imgDataUrl, url.x, url.y, url.w, url.h);
        $.error("");
      }
      boxEl.setAttribute("out_img", startImgIdx);
    }
    boxEl.setAttribute("out_img", imgIdx);
    boxEl.classList.add("decision_box");
    boxEl.querySelector(".box_remark").innerHTML = "";
    boxEl.querySelector(".box_str").innerHTML = "<div class=\"box_input\" style=\"display:flex;align-items:center;\">\n    <button type=\"button\" data-id=\"box_confirm\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">✔️</span></button>\n    <button type=\"button\" data-id=\"box_retry\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%;font-weight:bold\">+<span class=\"box_retry_count\">1</span></span></button>\n    <span class=\"box_of\" style=\"height:3em;margin:0 0.5em;display:inline-flex;align-items:center;\"></span>\n    <button type=\"button\" data-id=\"box_prev\" style=\"height:3em;width:3em;\"><span style=\"font-size:150%\">🡄</span></button>\n    <button type=\"button\" data-id=\"box_next\" style=\"height:3em;width:3em;\"><span style=\"font-size:150%\">🡆</span></button>\n    <button type=\"button\" data-id=\"box_remove\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">🗑️</span></button>\n    <button type=\"button\" data-id=\"box_cancel\" style=\"height:3em;width:3em;\"><span style=\"font-size:125%\">❌</span></button>\n    </div>";
    boxEl.querySelector(".box_of").innerHTML = parseInt(boxEl.getAttribute("out_img")) + 1 + " of " + task.out_img.length;
    boxEl.onmousemove = mouseEvt => {
      $.hide(BOX);
      if (boxEl.querySelector(".box_input")) {
        var boxRect = $.size(BOX);
        var relX = (mouseEvt.clientX - mouseEvt.target.getBoundingClientRect().left) / (boxRect.w + 1);
        var relY = (mouseEvt.clientY - mouseEvt.target.getBoundingClientRect().top) / (boxRect.h + 1);
        if (relY < 0.7) {
          $.show(boxEl.querySelector(".box_str"));
        } else {
          $.hide(boxEl.querySelector(".box_str"));
        }
      }
    };
    boxEl.onmouseleave = mouseEvt => {
      $.show(BOX);
      if (boxEl.querySelector(".box_input")) {
        $.hide(boxEl.querySelector(".box_str"));
      }
    };
    if (boxEl.matches(":hover")) {
      $.hide(BOX);
      $.show(boxEl.querySelector(".box_str"));
    }
    mylog("#draw/done/" + url.w + "/" + url.h);
  };
  task.funBad = resultData => {
    delete App.task[taskId];
    App.progSafeCheck += 1;
    App.progress = {
      progress: 0
    };
    cancelFn();
    console.log(resultData);
    var imgIdx = resultData.toString();
    var imgDataUrl = "Error with " + CFG.server + ", or invalid prompt. Run latest AUTOMATIC1111 with --api.";
    if (!CFG.server.includes("127.0.0.1") && !CFG.server.startsWith("https://")) {
      imgDataUrl += "<br>Moreover, google \"enable mixed content\" and change site settings.";
    }
    $.error(imgDataUrl);
    setBtn("help_show", true);
    mylog("#draw/err/" + imgIdx.substr(0, 100));
  };
  task.status = 0;
  task.timestamp = Date.now();
  App.sync();
};
CV.extraTask = function (scaleFactor) {
  let boxSize = $.size(BOX);
  var tmpCanvas = CV.new(boxSize.w, boxSize.h);
  tmpCanvas.getContext("2d").drawImage(CV.main, boxSize.x, boxSize.y, boxSize.w, boxSize.h, 0, 0, boxSize.w, boxSize.h);
  var apiUrl = "";
  var serverUrl = App.getServer();
  apiUrl = serverUrl + "/sdapi/v1/extra-single-image";
  prompt = {
    upscaler_1: "ESRGAN_4x",
    extras_upscaler_2_visibility: 0,
    upscaling_resize: scaleFactor,
    image: tmpCanvas.toDataURL()
  };
  $.error("Running ESRGAN_4x to " + scaleFactor + "x... (transparency will become black)");
  post(apiUrl, prompt).then(result => {
    var imgDataUrl = result.image;
    if (!imgDataUrl.startsWith("data:")) {
      imgDataUrl = "data:image/png;base64," + imgDataUrl;
    }
    var img = new Image();
    img.onload = function () {
      tmpCanvas = CV.new(boxSize.w * scaleFactor, boxSize.h * scaleFactor);
      tmpCanvas.getContext("2d").drawImage(img, 0, 0, boxSize.w * scaleFactor, boxSize.h * scaleFactor);
      CV.loadToNew(tmpCanvas);
    };
    img.src = imgDataUrl;
  }).catch(result => {
    console.log(result);
    var imgDataUrl = "Error with " + CFG.server + ". Try updating AUTOMATIC1111.";
    $.error(imgDataUrl);
  });
};
$.onClick = function (evt) {
  var btn = evt.target.closest("button");
  if (btn) {
    document.getSelection().removeAllRanges();
    document.activeElement.blur();
    gButton = -1;
    var btnClasses = btn.classList;
    var btnId = btn.dataset.id;
    $.error("");
    if (btnId == "img_save") {
      CV.save();
    } else if (btnId == "img_load") {
      $("#imageLoader").click();
    } else if (btnId == "img_copy") {
      CV.copy();
    } else if (btnId == "img_paste") {
      CV.paste();
    } else if (btnId == "img_undo") {
      CV.undo();
    } else if (btnId == "img_redo") {
      CV.redo();
    } else if (btnId.startsWith("box_")) {
      var boxEl = btn.closest(".drawBox");
      var boxSize = $.size(boxEl);
      var task = App.task[parseInt(boxEl.getAttribute("task"))];
      var prompt = task.prompt;
      if (task.status == 1) {
        post(App.getServer() + "/sdapi/v1/interrupt", {});
        return;
      }
      var shouldClose = false;
      var isRetry = btnId == "box_retry";
      var isNext = btnId == "box_next";
      var isPrev = btnId == "box_prev";
      if (btnId == "box_remove") {
        try {
          if (boxEl.querySelector(".box_of").innerHTML.startsWith("0 of")) {} else if (task.out_img.length <= 1) {
            delete task.out_img;
            isRetry = true;
          } else {
            var imgIdx = parseInt(boxEl.getAttribute("out_img"));
            if (imgIdx == task.out_img.length - 1) {
              task.out_img.splice(imgIdx, 1);
              isPrev = true;
            } else {
              isNext = true;
            }
          }
        } catch (err) {}
      }
      if (isRetry) {
        prompt.n_iter = parseInt(boxEl.querySelector(".box_retry_count").innerHTML);
        CV.sendPrompt(prompt, boxEl);
        if ("init_images" in prompt) {
          CV.loadDataURL(CV.mainC, prompt.init_images[0], boxSize.x, boxSize.y, boxSize.w, boxSize.h);
        } else {
          var noiseCanvas = CV.new(boxSize.w, boxSize.h);
          var noiseCtx = noiseCanvas.getContext("2d");
          CV.noise(noiseCtx, boxSize.w, boxSize.h);
          CV.mainC.drawImage(noiseCanvas, boxSize.x, boxSize.y);
        }
      } else if (isNext) {
        if (btnId == "box_next") {
          var nextIdx = min(task.out_img.length - 1, parseInt(boxEl.getAttribute("out_img")) + 1);
          if (nextIdx != imgIdx) {
            CV.loadDataURL(CV.mainC, task.out_img[nextIdx], boxSize.x, boxSize.y, boxSize.w, boxSize.h);
            boxEl.setAttribute("out_img", nextIdx);
            boxEl.querySelector(".box_of").innerHTML = nextIdx + 1 + " of " + task.out_img.length;
          }
        } else {
          var imgIdx = parseInt(boxEl.getAttribute("out_img"));
          task.out_img.splice(imgIdx, 1);
          CV.loadDataURL(CV.mainC, task.out_img[imgIdx], boxSize.x, boxSize.y, boxSize.w, boxSize.h);
          boxEl.querySelector(".box_of").innerHTML = imgIdx + 1 + " of " + task.out_img.length;
        }
      } else if (isPrev) {
        var imgIdx = parseInt(boxEl.getAttribute("out_img"));
        var nextIdx = max(-1, imgIdx - 1);
        if (!("init_images" in prompt)) {
          nextIdx = max(0, nextIdx);
        }
        if (nextIdx != imgIdx) {
          if (nextIdx >= 0) {
            CV.loadDataURL(CV.mainC, task.out_img[nextIdx], boxSize.x, boxSize.y, boxSize.w, boxSize.h);
          } else {
            CV.mainC.clearRect(boxSize.x, boxSize.y, boxSize.w, boxSize.h);
            CV.loadDataURL(CV.mainC, task.orig_img, boxSize.x, boxSize.y, boxSize.w, boxSize.h);
          }
          boxEl.setAttribute("out_img", nextIdx);
          boxEl.querySelector(".box_of").innerHTML = nextIdx + 1 + " of " + task.out_img.length;
        }
      } else if (btnId == "box_confirm") {
        CV.maskC.clearRect(boxSize.x, boxSize.y, boxSize.w, boxSize.h);
        shouldClose = true;
      } else if (btnId == "box_cancel") {
        CV.mainC.clearRect(boxSize.x, boxSize.y, boxSize.w, boxSize.h);
        CV.loadDataURL(CV.mainC, task.orig_img, boxSize.x, boxSize.y, boxSize.w, boxSize.h);
        shouldClose = true;
      }
      if (shouldClose) {
        delete App.task[parseInt(boxEl.getAttribute("task"))];
        boxEl.remove();
        $.show(BOX);
      }
    } else {
      btnClasses.toggle("active");
      setBtn(btnId, btnClasses.contains("active"));
    }
  }
};
document.addEventListener("click", $.onClick);
window.onbeforeunload = () => 1;
document.addEventListener("dragover", evt => {
  evt.preventDefault();
  evt.stopPropagation();
});
document.addEventListener("drop", evt => {
  evt.preventDefault();
  evt.stopPropagation();
  if (App.eeMoving) {
    $.error("Please place the last image first.");
    return;
  }
  $.error("Loading image...");
  CV.loadBlob(null, evt.dataTransfer.files[0], canvas => {
    CV.loadToNew(canvas);
  });
});
document.addEventListener("keydown", evt => {
  if (evt.repeat) {
    return;
  }
  if (evt.key.toLowerCase() == "escape") {
    App.clearDefault(evt);
    setBtn("prompt_show", false);
    setBtn("config_show", false);
    setBtn("help_show", false);
  } else if ($.type(evt.target) == "body") {
    if (evt.key.toLowerCase() == " ") {
      App.clearDefault(evt);
      toggleBtn("prompt_show");
    } else if (evt.key.toLowerCase() == "shift") {
      App.clearDefault(evt);
      toggleBtn("mask_draw");
    } else if (evt.key.toLowerCase() == "tab") {
      App.clearDefault(evt);
      toggleBtn("mask_show");
    } else if (evt.key.toLowerCase() == "`") {
      App.clearDefault(evt);
      toggleBtn("brush_draw");
    } else if (evt.key.toLowerCase() == "g") {
      App.clearDefault(evt);
      toggleBtn("grid_mode");
    } else if (evt.key.toLowerCase() == "z" && evt.ctrlKey) {
      App.clearDefault(evt);
      CV.undo();
    } else if (evt.key.toLowerCase() == "y" && evt.ctrlKey) {
      App.clearDefault(evt);
      CV.redo();
    } else if (evt.key.toLowerCase() == "s" && evt.ctrlKey) {
      App.clearDefault(evt);
      CV.save();
    } else if (evt.key.toLowerCase() == "o" && evt.ctrlKey) {
      App.clearDefault(evt);
      $("#imageLoader").click();
    }
  }
});
document.addEventListener("contextmenu", evt => {
  if ($.type(evt.target) == "textarea") {
    return;
  }
  if (evt.target.closest("#help")) {
    return;
  }
  preventDefault(evt);
});
document.addEventListener("copy", evt => {
  if ($.type(evt.target) == "body") {
    App.clearDefault(evt);
    CV.copy();
  }
});
document.addEventListener("paste", evt => {
  if ($.type(evt.target) == "body") {
    App.clearDefault(evt);
    CV.paste();
  }
});
$("#palette").addEventListener("click", function (evt) {
  var target = evt.target;
  gBrush.color = target.style.background;
  if ($.isActive("brush_draw")) {
    updateBrush(gBrush.sz);
  }
});
$("#imageLoader").addEventListener("change", evt => {
  CV.load();
}, false);
$("#tools").addEventListener("mouseenter", function (evt) {
  $.hide(BOX);
});
$("#tools").addEventListener("mouseleave", function (evt) {
  $.show(BOX);
});
$("#prompt_sampler").addEventListener("change", App.syncPrompt);
$("#prompt_fill").addEventListener("change", App.syncPrompt);
$("#prompt_model").addEventListener("change", App.syncModel);
SKETCH.addEventListener("mousedown", function (evt) {
  var mouseX = gMouseNow.x;
  var mouseY = gMouseNow.y;
  $.error("");
  document.getSelection().removeAllRanges();
  if (evt.target.closest(".decision_box")) {
    return;
  }
  if ($.type(evt.target) == "select") {
    return;
  }
  if (evt.button == 0) {
    if (evt.target.closest(".box_input")) {
      return;
    }
    if (evt.target.closest(".box_inputX")) {
      return;
    }
  }
  App.clearDefault(evt);
  if (App.eeMoving) {
    if (evt.button == 0) {
      var imgW = App.eeMoving.width;
      var imgH = App.eeMoving.height;
      var snapStep = $.isActive("grid_mode") ? GRIDSZ : 1;
      mouseX = floor(mouseX / snapStep) * snapStep;
      mouseY = floor(mouseY / snapStep) * snapStep;
      var placeX = mouseX;
      var placeY = mouseY;
      if (evt.ctrlKey) {
        placeX = floor((WW - imgW) / 2 / GRIDSZ) * GRIDSZ;
        placeY = floor((HH - imgH) / 2 / GRIDSZ) * GRIDSZ;
      }
      CV.snapshot();
      CV.mainC.drawImage(App.eeMoving, 0, 0, imgW, imgH, placeX, placeY, imgW, imgH);
    }
    App.eeMoving.remove();
    if (evt.button == 2 && App.eeMovingRestore != null) {
      CV.mainC.drawImage(App.eeMoving, App.eeMovingRestore.x, App.eeMovingRestore.y);
    }
    App.eeMoving = null;
    App.eeMovingRestore = null;
    return;
  }
  var isMaskDraw = $.isActive("mask_draw");
  var isBrushDraw = $.isActive("brush_draw");
  if (isBrushDraw && evt.ctrlKey && evt.button == 0) {
    var pixel = CV.mainC.getImageData(mouseX, mouseY, 1, 1).data;
    if (pixel[3] > 0) {
      pixel = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")";
      gBrush.color = pixel;
      updateBrush(gBrush.sz);
    }
    return;
  }
  if (isMaskDraw || isBrushDraw) {
    CV.snapshot();
    gButton = evt.button;
    gMouseLast.x = mouseX;
    gMouseLast.y = mouseY;
    var ctx = isMaskDraw ? CV.maskC : CV.mainC;
    ctx.fillStyle = isMaskDraw ? "#fff" : gBrush.color;
    if (evt.button == 2) {
      ctx.globalCompositeOperation = "destination-out";
    }
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, gBrush.sz / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    if (isBrushDraw && evt.button == 0) {
      ctx = CV.maskC;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, (gBrush.sz + 4) / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }
  if (gButton >= 0 && evt.button == 2) {
    gButton = -1;
    updateBOX(mouseX, mouseY, mouseX, mouseY);
  } else if (gButton == -1) {
    gButton = evt.button;
    gMouseLast.x = mouseX;
    gMouseLast.y = mouseY;
    updateBOX(mouseX, mouseY, mouseX, mouseY);
  } else {
    var imgIdx = $.size(BOX);
    if (gButton == 0) {
      CV.snapshot();
      console.log("send", imgIdx);
      CV.draw(imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h);
    } else {
      var selectEl = BOX.querySelector(".box_select");
      selectEl = selectEl.options[selectEl.selectedIndex].text.toLowerCase();
      selectEl = Array.from(selectEl).slice(1).join("");
      if (selectEl == "erase") {
        CV.snapshot();
        CV.mainC.fillStyle = "#fff";
        CV.mainC.globalCompositeOperation = "destination-out";
        CV.mainC.fillRect(imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h);
        CV.mainC.globalCompositeOperation = "source-over";
      } else if (selectEl == "move") {
        if (App.eeMoving) {
          $.error("Please place the last image first.");
        } else {
          var tmpCanvas = CV.new(imgIdx.w, imgIdx.h);
          tmpCanvas.getContext("2d").drawImage(CV.main, imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h, 0, 0, imgIdx.w, imgIdx.h);
          App.eeMovingRestore = {
            x: imgIdx.x,
            y: imgIdx.y
          };
          CV.loadToNew(tmpCanvas);
          CV.mainC.fillStyle = "#fff";
          CV.mainC.globalCompositeOperation = "destination-out";
          CV.mainC.fillRect(imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h);
          CV.mainC.globalCompositeOperation = "source-over";
        }
      } else if (selectEl == "clone") {
        if (App.eeMoving) {
          $.error("Please place the last image first.");
        } else {
          var tmpCanvas = CV.new(imgIdx.w, imgIdx.h);
          tmpCanvas.getContext("2d").drawImage(CV.main, imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h, 0, 0, imgIdx.w, imgIdx.h);
          CV.loadToNew(tmpCanvas);
        }
      } else if (selectEl == "mask" || selectEl == "unmask") {
        CV.snapshot();
        var ctx = CV.maskC;
        ctx.fillStyle = "#fff";
        if (selectEl == "unmask") {
          ctx.globalCompositeOperation = "destination-out";
        }
        ctx.beginPath();
        ctx.rect(imgIdx.x, imgIdx.y, imgIdx.w, imgIdx.h);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      } else if (selectEl == "scale2x" || selectEl == "scale3x" || selectEl == "scale4x") {
        if (selectEl == "scale2x") {
          CV.extraTask(2);
        }
        if (selectEl == "scale3x") {
          CV.extraTask(3);
        }
        if (selectEl == "scale4x") {
          CV.extraTask(4);
        }
      }
    }
    gButton = -1;
  }
});
SKETCH.addEventListener("mouseup", function (evt) {
  if ($.isActive("mask_draw") || $.isActive("brush_draw")) {
    gButton = -1;
  }
});
SKETCH.addEventListener("mouseenter", function (evt) {
  document.activeElement.blur();
});
SKETCH.addEventListener("mousemove", function (evt) {
  var style = window.getComputedStyle(SKETCH);
  var mouseX = evt.pageX - parseFloat(style.left);
  var mouseY = evt.pageY - parseFloat(style.top);
  gMouseNow.x = mouseX;
  gMouseNow.y = mouseY;
  App.mousemove(evt);
});
document.addEventListener("wheel", function (evt) {
  if ($.type(evt.target) == "select") {
    if (evt.deltaY < 0) {
      evt.target.selectedIndex = Math.max(evt.target.selectedIndex - 1, 0);
    }
    if (evt.deltaY > 0) {
      evt.target.selectedIndex = Math.min(evt.target.selectedIndex + 1, evt.target.length - 1);
    }
    if (evt.target.id.startsWith("prompt")) {
      if (evt.target.id == "prompt_model") {
        App.syncModel();
      } else {
        App.syncPrompt();
      }
    }
  }
});
SKETCH.addEventListener("wheel", function (evt) {
  if (evt.target.closest("button[data-id=\"box_retry\"]")) {
    App.clearDefault(evt);
    var btn = evt.target.closest("button");
    var el = btn.querySelector(".box_retry_count");
    el.innerHTML = min(99, max(1, parseInt(el.innerHTML) + sign(evt.deltaY)));
  } else if (evt.target.closest(".decision_box")) {
    App.clearDefault(evt);
    var btn = evt.target.closest(".decision_box");
    try {
      if (evt.deltaY < 0) {
        btn.querySelector("button[data-id=\"box_prev\"]").click();
      } else if (evt.deltaY > 0) {
        btn.querySelector("button[data-id=\"box_next\"]").click();
      }
    } catch (err) {}
  } else if ($.isActive("mask_draw") || $.isActive("brush_draw")) {
    App.clearDefault(evt);
    updateBrush(gBrush.sz + sign(evt.deltaY) * 2);
  } else if (gButton == 2) {
    App.clearDefault(evt);
    try {
      var el = BOX.querySelector(".box_select");
      if (evt.deltaY < 0) {
        el.selectedIndex = Math.max(el.selectedIndex - 1, 0);
      } else if (evt.deltaY > 0) {
        el.selectedIndex = Math.min(el.selectedIndex + 1, el.length - 1);
      }
      el.dispatchEvent(new Event("change"));
    } catch (err2) {}
  } else if (gButton == 0) {
    App.clearDefault(evt);
    try {
      if (evt.target.closest(".box_strength")) {
        var el = BOX.querySelector(".box_strength");
        el.value = parseFloat(el.value) + sign(evt.deltaY) * 0.05;
        el.dispatchEvent(new Event("change"));
      } else {
        var el = BOX.querySelector(".box_trial");
        el.value = parseInt(el.value) + sign(evt.deltaY);
        el.dispatchEvent(new Event("change"));
      }
    } catch (err3) {}
  }
});
setBtn("grid_mode", true);
