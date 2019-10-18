Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    maskClosable: {
      type: Boolean,
      value: true
    },
    mask: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    },
  },
  data: {
  },
  ready: function ready() {
  },

  methods: {
    close: function close() {
      var data = this.data;
      if (!data.maskClosable) return;
      this.setData({
        show: false
      });
      this.triggerEvent('close', {}, {});
    },
  }
});