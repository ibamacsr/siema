(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  google.load("visualization", "1", {
    packages: ["corechart"]
  });

  google.load("visualization", "1", {
    packages: ["gauge"]
  });

  google.load("visualization", "1", {
    packages: ["table"]
  });

  H5.Charts = {};

  H5.Charts.Container = (function() {
    Container.prototype.options = {
      type: null,
      container: null,
      period: 1,
      title: "",
      defaultClass: "",
      selects: void 0,
      resizing: 0,
      buttons: {
        minusplus: false,
        arrows: false,
        table: false,
        "export": false,
        minimize: false,
        maximize: false,
        close: false
      }
    };

    function Container(options) {
      this.options = $.extend({}, this.options, options);
      this._createContainer();
    }

    Container.prototype.changeTitle = function(title) {
      var pipeline;
      $(this._boxTitle).html(title);
      if (this.options.buttons.arrows || this.options.buttons.minusplus || (this.options.selects != null)) {
        pipeline = "<span class=\"break\"></span>";
        return $(this._boxTitle).prepend(pipeline);
      }
    };

    Container.prototype._createContainer = function() {
      var addBtn, addIcon, boxContent, boxHeader, boxTable, boxTitle, closeBtn, closeIcon, delBtn, delIcon, exportBtn, exportIcon, formBtn, leftBtn, leftCtrl, leftIcon, maxBtn, maxIcon, minBtn, minIcon, pipeline, rightBtn, rightCtrl, rightIcon, tableBtn, tableIcon,
        _this = this;
      this._container = document.getElementById(this.options.container);
      boxHeader = document.createElement("div");
      boxHeader.className = "box-header";
      this._boxHeader = boxHeader;
      boxTitle = document.createElement("h2");
      boxTitle.innerHTML = this.options.title;
      this._boxTitle = boxTitle;
      leftCtrl = document.createElement("div");
      leftCtrl.className = "btn-group chart-icon btn-left";
      this._leftCtrl = leftCtrl;
      rightCtrl = document.createElement("div");
      rightCtrl.className = "btn-group chart-icon btn-right";
      this._rightCtrl = rightCtrl;
      boxContent = document.createElement("div");
      boxContent.id = "box-" + this.options.container;
      boxContent.className = "box-content";
      this._boxContent = boxContent;
      $(this._boxHeader).append(this._leftCtrl, this._boxTitle, this._rightCtrl);
      $(this._container).append(this._boxHeader, this._boxContent);
      pipeline = "<span class=\"break\"></span>";
      if (this.options.buttons.minusplus) {
        $(this._boxTitle).prepend(pipeline);
        delBtn = document.createElement("button");
        delBtn.id = this.options.container + "-btn-minus";
        delBtn.className = "btn";
        this._delBtn = delBtn;
        delIcon = document.createElement("i");
        delIcon.className = "icon-minus";
        this._delIcon = delIcon;
        $(this._delBtn).append(this._delIcon);
        addBtn = document.createElement("button");
        addBtn.id = this.options.container + "-btn-plus";
        addBtn.className = "btn";
        this._addBtn = addBtn;
        addIcon = document.createElement("i");
        addIcon.className = "icon-plus";
        this._addIcon = addIcon;
        $(this._addBtn).append(this._addIcon);
        $(this._leftCtrl).append(this._delBtn, this._addBtn);
      } else if (this.options.buttons.arrows) {
        $(this._boxTitle).prepend(pipeline);
        leftBtn = document.createElement("button");
        leftBtn.id = this.options.container + "-btn-left";
        leftBtn.className = "btn";
        this._leftBtn = leftBtn;
        leftIcon = document.createElement("i");
        leftIcon.className = "icon-arrow-left";
        this._leftIcon = leftIcon;
        $(this._leftBtn).append(this._leftIcon);
        rightBtn = document.createElement("button");
        rightBtn.id = this.options.container + "-btn-right";
        rightBtn.className = "btn";
        this._rightBtn = rightBtn;
        rightIcon = document.createElement("i");
        rightIcon.className = "icon-arrow-right";
        this._rightIcon = rightIcon;
        $(this._rightBtn).append(this._rightIcon);
        $(this._leftCtrl).append(this._leftBtn, this._rightBtn);
      } else if (this.options.selects != null) {
        $(this._boxTitle).prepend(pipeline);
        formBtn = document.createElement("form");
        formBtn.name = "form-" + this.options.container;
        formBtn.className = "form-inline";
        this._formBtn = formBtn;
        $.each(this.options.selects, function(name, options) {
          var select;
          select = "<select id=\"" + name + "Slct\" class=\"input-mini\" name=\"" + name + "\">";
          $.each(options, function(value, key) {
            return select += "<option value=" + value + ">" + key + "</option>";
          });
          select += "</select>";
          return $(_this._formBtn).append(select);
        });
        $(this._leftCtrl).append(this._formBtn);
        $(this._leftCtrl).removeClass("btn-group");
        $.each(this.options.selects, function(name, data) {
          _this["_" + name + "Slct"] = document["form-" + _this.options.container][name];
          return _this._enableSelect("#" + name + "Slct");
        });
      }
      if (this.options.buttons.table) {
        tableBtn = document.createElement("button");
        tableBtn.id = this.options.container + "-btn-table";
        tableBtn.className = "btn";
        tableBtn.title = "Mostrar tabela";
        this._tableBtn = tableBtn;
        tableIcon = document.createElement("i");
        tableIcon.className = "icon-table";
        this._tableIcon = tableIcon;
        $(this._tableBtn).append(this._tableIcon);
        $(this._rightCtrl).append(this._tableBtn);
        boxTable = document.createElement("div");
        boxTable.id = "table-" + this.options.container;
        boxTable.className = "box-content-table";
        this._boxTable = boxTable;
        $(this._container).append(this._boxTable);
        this._enableTable();
      }
      if (this.options.buttons["export"]) {
        exportBtn = document.createElement("button");
        exportBtn.id = this.options.container + "-btn-export";
        exportBtn.title = "Exportar para arquivo";
        exportBtn.className = "btn";
        this._exportBtn = exportBtn;
        exportIcon = document.createElement("i");
        exportIcon.className = "icon-download-alt";
        this._exportIcon = exportIcon;
        $(this._exportBtn).append(this._exportIcon);
        $(this._rightCtrl).append(this._exportBtn);
        this._enableExport();
      }
      if (this.options.buttons.minimize) {
        minBtn = document.createElement("button");
        minBtn.id = this.options.container + "-btn-minimize";
        minBtn.title = "Reduzir";
        minBtn.className = "btn";
        this._minBtn = minBtn;
        minIcon = document.createElement("i");
        minIcon.className = "icon-chevron-up";
        this._minIcon = minIcon;
        $(this._minBtn).append(this._minIcon);
        $(this._rightCtrl).append(this._minBtn);
        this._enableMinimize();
      }
      if (this.options.buttons.maximize) {
        maxBtn = document.createElement("button");
        maxBtn.id = this.options.container + "-btn-maximize";
        maxBtn.title = "Maximizar";
        maxBtn.className = "btn";
        this._maxBtn = maxBtn;
        maxIcon = document.createElement("i");
        maxIcon.className = "icon-resize-full";
        this._maxIcon = maxIcon;
        $(this._maxBtn).append(this._maxIcon);
        $(this._rightCtrl).append(this._maxBtn);
        this._enableMaximize();
      }
      if (this.options.buttons.close) {
        closeBtn = document.createElement("button");
        closeBtn.id = this.options.container + "-btn-close";
        closeBtn.className = "btn";
        this._closeBtn = closeBtn;
        closeIcon = document.createElement("i");
        closeIcon.className = "icon-remove";
        this._closeIcon = closeIcon;
        $(this._closeBtn).append(this._closeIcon);
        $(this._rightCtrl).append(this._closeBtn);
        return this._enableClose();
      }
    };

    Container.prototype._enableMinimize = function() {
      var _this = this;
      return $(this._minBtn).on("click", function(event) {
        event.preventDefault();
        if ($(_this._boxContent).is(":visible")) {
          _this._minIcon.className = "icon-chevron-down";
          _this._minBtn.title = "Aumentar";
          if (_this.options.buttons.minusplus) {
            $(_this._addBtn).prop("disabled", true);
            $(_this._delBtn).prop("disabled", true);
          } else if (_this.options.buttons.arrows) {
            $(_this._leftBtn).prop("disabled", true);
            $(_this._rightBtn).prop("disabled", true);
          }
        } else {
          _this._minIcon.className = "icon-chevron-up";
          _this._minBtn.title = "Reduzir";
          if (_this.options.buttons.minusplus) {
            $(_this._addBtn).prop("disabled", false);
            $(_this._delBtn).prop("disabled", false);
          } else if (_this.options.buttons.arrows) {
            $(_this._leftBtn).prop("disabled", false);
            $(_this._rightBtn).prop("disabled", false);
          }
        }
        if ($(_this._boxTable).is(":visible")) {
          $(_this._boxTable).slideToggle("fast", "linear");
        }
        return $(_this._boxContent).slideToggle("fast", "linear");
      });
    };

    Container.prototype._enableMaximize = function() {
      var _this = this;
      return $(this._maxBtn).on("click", function(event) {
        event.preventDefault();
        if (_this._maxIcon.className === "icon-resize-full") {
          _this.defaultClass = _this._container.className;
          $(_this._minBtn).prop("disabled", true);
          $(_this._closeBtn).prop("disabled", true);
          _this._maxIcon.className = "icon-resize-small";
          _this._maxIcon.title = "Minimizar";
          $("#navbar").hide();
        } else {
          $(_this._minBtn).prop("disabled", false);
          $(_this._closeBtn).prop("disabled", false);
          _this._maxIcon.className = "icon-resize-full";
          _this._maxIcon.title = "Maximizar";
          $("#navbar").show();
        }
        $(_this._boxTable).hide();
        $(_this._boxTable).toggleClass("box-table-overlay");
        _this._tableIcon.className = "icon-table";
        $(_this._container).toggleClass(_this.defaultClass);
        $(_this._container).toggleClass("box-overlay");
        $("body").toggleClass("body-overlay");
        $(_this._boxContent).toggleClass("content-overlay");
        $(_this._boxTable).toggleClass("content-overlay");
        $(_this._boxContent).hide();
        $(_this._boxContent).fadeToggle(500, "linear");
        return _this.drawChart();
      });
    };

    Container.prototype._enableClose = function() {
      var _this = this;
      return $(this._closeBtn).on("click", function(event) {
        event.preventDefault();
        return $(_this._container).hide("slide", "linear", 600);
      });
    };

    Container.prototype._enableSelect = function(select) {
      var _this = this;
      return $(select).on("change", function(event) {
        return _this.drawChart();
      });
    };

    return Container;

  })();

  H5.Charts.GoogleCharts = (function(_super) {
    __extends(GoogleCharts, _super);

    function GoogleCharts() {
      GoogleCharts.__super__.constructor.apply(this, arguments);
      this.createChart();
    }

    GoogleCharts.prototype.createDataTable = function() {
      return this.data = new google.visualization.DataTable();
    };

    GoogleCharts.prototype.createChart = function() {
      if (this.options.type === "Gauge") {
        this.chart = new google.visualization.Gauge(this._boxContent);
      } else {
        this.chart = new google.visualization[this.options.type + "Chart"](this._boxContent);
      }
      return this._detectScreenChanges();
    };

    GoogleCharts.prototype._detectScreenChanges = function() {
      var orientationEvent, supportsOrientationChange,
        _this = this;
      supportsOrientationChange = "onorientationchange" in window;
      orientationEvent = (supportsOrientationChange ? "orientationchange" : "resize");
      return window.addEventListener(orientationEvent, (function() {
        if ($(_this._boxContent).is(":visible") && !_this.options.resizing) {
          _this.options.resizing = true;
          _this.drawChart();
          return _this.options.resizing = false;
        }
      }), false);
    };

    GoogleCharts.prototype._enableTable = function() {
      var _this = this;
      return $(this._tableBtn).on("click", function(event) {
        var visualization;
        event.preventDefault();
        if ($(_this._boxContent).is(":hidden")) {
          _this._minIcon.className = "icon-chevron-up";
          $(_this._boxContent).fadeToggle('fast', 'linear');
        }
        $(_this._boxTable).fadeToggle('fast', 'linear');
        if (_this._tableIcon.className === "icon-table") {
          _this._tableIcon.className = "icon-bar-chart";
          _this._tableBtn.title = "Mostrar gráfico";
          visualization = new google.visualization.Table(_this._boxTable);
          visualization.draw(_this.data, null);
        } else {
          _this._tableIcon.className = "icon-table";
          _this._tableBtn.title = "Mostrar tabela";
        }
        return $(_this._leftBtn).add(_this._rightBtn).add(_this._addBtn).add(_this._delBtn).on("click", function(event) {
          if ($(_this._boxTable).is(":visible")) {
            visualization = new google.visualization.Table(_this._boxTable);
            return visualization.draw(_this.data, null);
          }
        });
      });
    };

    GoogleCharts.prototype._enableExport = function() {
      var generateCSV, getTitle,
        _this = this;
      generateCSV = function() {
        var col, line, row, str, title, value, _i, _j, _k, _ref, _ref1, _ref2;
        str = "";
        line = "";
        for (col = _i = 0, _ref = _this.data.getNumberOfColumns(); 0 <= _ref ? _i < _ref : _i > _ref; col = 0 <= _ref ? ++_i : --_i) {
          title = _this.data.getColumnLabel(col);
          line += "\"" + title + "\",";
        }
        str += line + "\r\n";
        for (row = _j = 0, _ref1 = _this.data.getNumberOfRows(); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; row = 0 <= _ref1 ? ++_j : --_j) {
          line = "";
          for (col = _k = 0, _ref2 = _this.data.getNumberOfColumns(); 0 <= _ref2 ? _k < _ref2 : _k > _ref2; col = 0 <= _ref2 ? ++_k : --_k) {
            value = _this.data.getFormattedValue(row, col);
            line += "\"" + value + "\",";
          }
          str += line + "\r\n";
        }
        return str;
      };
      getTitle = function() {
        if (_this._boxHeader.childNodes["1"].childNodes["0"].data) {
          return _this._boxHeader.childNodes["1"].childNodes["0"].data + ".csv";
        } else if (_this._boxHeader.childNodes["1"].childNodes["1"].data) {
          return _this._boxHeader.childNodes["1"].childNodes["1"].data + ".csv";
        } else {
          return _this.options.title + ".csv";
        }
      };
      return $(this._exportBtn).click(function() {
        var csv, downloadLink, uri;
        csv = generateCSV();
        uri = "data:text/csv;charset=ISO-8859-1," + escape(csv);
        downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = getTitle();
        document.body.appendChild(downloadLink);
        downloadLink.click();
        return document.body.removeChild(downloadLink);
      });
    };

    return GoogleCharts;

  })(H5.Charts.Container);

  H5.Charts.SmallContainer = (function() {
    SmallContainer.prototype.options = {
      type: null,
      container: null,
      title: "",
      popover: false
    };

    function SmallContainer(options) {
      this.options = $.extend({}, this.options, options);
      this._createContainer();
    }

    SmallContainer.prototype._createContainer = function() {
      var leftCtrl, rightCtrl;
      this._container = document.getElementById(this.options.container);
      leftCtrl = document.createElement("div");
      leftCtrl.className = "left";
      this._leftCtrl = leftCtrl;
      rightCtrl = document.createElement("div");
      rightCtrl.className = "right";
      this._rightCtrl = rightCtrl;
      $(this._container).append(this._leftCtrl, this._rightCtrl);
      if (this.options.popover) {
        $(this._container).addClass("popover-" + this.options.container);
        return this._createPopover();
      }
    };

    SmallContainer.prototype._createPopover = function() {
      var html, placement, trigger;
      placement = "bottom";
      trigger = "hover";
      html = true;
      return $(".popover-" + this.options.container).popover({
        placement: placement,
        delay: {
          show: 700,
          hide: 300
        },
        content: "<span>" + this.options.popover + "</span>",
        trigger: trigger,
        html: html
      });
    };

    return SmallContainer;

  })();

  H5.Charts.Knobs = (function(_super) {
    __extends(Knobs, _super);

    function Knobs() {
      _ref = Knobs.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Knobs.prototype.updateInfo = function(value) {
      $(this._rightCtrl).html("<strong>" + value + "%</strong><br/> " + this.options.title);
      return this._updateChart(parseFloat(value));
    };

    Knobs.prototype._createContainer = function() {
      var dial;
      Knobs.__super__._createContainer.apply(this, arguments);
      dial = document.createElement("input");
      dial.type = "text";
      dial.className = "dial";
      this._dial = dial;
      $(this._leftCtrl).append(this._dial);
      return this._createChart();
    };

    Knobs.prototype._createChart = function() {
      $(this._dial).knob({
        min: -100,
        max: 100,
        bgColor: "#DEDEDE",
        fgColor: "#DEDEDE",
        angleOffset: -125,
        angleArc: 250,
        readOnly: true,
        width: 58,
        height: 58,
        thickness: 0.5,
        displayInput: false,
        color: this.options.color,
        draw: function() {
          var color, value, _max, _min;
          value = this.val();
          _min = this.o.min;
          _max = this.o.max;
          if (this.o.color === "coldtohot") {
            if ((_min <= value && value <= _min * 0.3)) {
              color = pusher.color("#67C2EF");
            } else if ((_min * 0.3 < value && value <= _max * 0.3)) {
              color = pusher.color("#CBE968");
            } else if ((_max * 0.3 < value && value <= _max * 0.7)) {
              color = pusher.color("#FABB3D");
            } else if ((_max * 0.7 < value && value <= _max * 0.9)) {
              color = pusher.color("#FA603D");
            } else {
              color = pusher.color("#FF5454");
            }
          } else {
            if (value <= 0) {
              color = pusher.color("#D0FC3F");
            } else if ((0 < value && value <= _max * 0.6)) {
              color = pusher.color("#FCAC0A");
            } else {
              color = pusher.color("#FC2121");
            }
          }
          return this.o.fgColor = color.html();
        }
      });
      return $(this._dial).val(0).trigger("change");
    };

    Knobs.prototype._updateChart = function(total) {
      var dial;
      dial = $(this._leftCtrl).find('.dial');
      if (!H5.isMobile.any()) {
        return $({
          value: dial.val()
        }).animate({
          value: total
        }, {
          duration: 2000,
          easing: "easeOutBounce",
          step: function() {
            return dial.val(Math.floor(this.value)).trigger("change");
          }
        });
      } else {
        return dial.val(Math.floor(total)).trigger("change");
      }
    };

    return Knobs;

  })(H5.Charts.SmallContainer);

  H5.Charts.Sparks = (function(_super) {
    __extends(Sparks, _super);

    function Sparks() {
      _ref1 = Sparks.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Sparks.prototype.updateInfo = function(data, value) {
      $(this._rightCtrl).html("<strong>" + value + "</strong><br /> " + this.options.title);
      return this._updateChart(data);
    };

    Sparks.prototype._createContainer = function() {
      var spark;
      Sparks.__super__._createContainer.apply(this, arguments);
      spark = document.createElement("div");
      spark.className = "minichart";
      this._spark = spark;
      return $(this._leftCtrl).append(this._spark);
    };

    Sparks.prototype._updateChart = function(data) {
      return $(this._spark).sparkline(data, {
        width: 58,
        height: 62,
        lineColor: "#2FABE9",
        fillColor: "#67C2EF",
        spotColor: "#CBE968",
        maxSpotColor: "#FF5454",
        minSpotColor: "#67C2EF",
        spotRadius: 1.5,
        lineWidth: 1
      });
    };

    return Sparks;

  })(H5.Charts.SmallContainer);

}).call(this);
