// start.js

Page({

  /**
   * ҳ��ĳ�ʼ����
   */
  data: {
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: 'ѧϰģʽ', checked: 'ture' },
      { name: 'down', value: '��Ϣ��Ϣ' },
    ]
  },

  radioChange: function (e) {
    //���汨�����򵽵�ǰҳ�������
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function () {
    var that = this
    //ȡ���������ݺͱ�������
    var thres = this.data.threshold
    var Rule = this.data.rule

    //���ðٶ�����API

    const requestTask = wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8', //�ٶ�����API
      header: {
        'content-type': 'application/json',
      },

      success: function (res) {
        // ���������ַ����Ӱٶ�����API�ķ��������нس������ѧϰ����
        var str = res.data.results[0].weather_data[0].date;
        var tmp1 = str.match(/ʵʱ.+/);
        var tmp2 = tmp1[0].substring(3, tmp1[0].length - 2);
        var tmp = +tmp2;

        //ѧϰ��ʹ�����ֻ�
        if (tmp >=1) {
          if (that.data.rule == "up") {
            //ѧϰ�в�Ӧʹ���ֻ�
            wx.showModal({
              title: '������',
              content: 'ȥѧϰ',
              success: function (res) {
                if (res.confirm) {
                  console.log('�û����ȷ��')
                } else if (res.cancel) {
                  console.log('�û����ȡ��')
                }
              }
            })
          }
          //��Ϣ��ʱ��ʹ���ֻ�
          else if (that.data.rule == "down") {
            wx.showModal({
              title: '��ʾ��',
              content: '��Ϣ��ǵ�ѧϰŶ',
              success: function (res) {
                if (res.confirm) {
                  console.log('�û����ȷ��')
                } else if (res.cancel) {
                  console.log('�û����ȡ��')
                }
              }
            })
          }
        }
        //û�����ֻ�
        else if (tmp <1) {
          //ѧϰ��û�����ֻ�
          if (that.data.rule == "up") {
            wx.showModal({
              title: '��ʾ��',
              content: '�������������ȥ',
              success: function (res) {
                if (res.confirm) {
                  console.log('�û����ȷ��')
                } else if (res.cancel) {
                  console.log('�û����ȡ��')
                }
              }
            })
          }
          //����Ϊ�������ޱ��������Ǳ���
          else if (that.data.rule == "down") {
            wx.showModal({
              title: 'ע�⣡',
              content: '�ǵ�ȥѧϰ',
              success: function (res) {
                if (res.confirm) {
                  console.log('�û����ȷ��')
                } else if (res.cancel) {
                  console.log('�û����ȡ��')
                }
              }
            })
          }
        }
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  getDataFromOneNet: function () {
    //��oneNET�������ǵ�Wi-Fi����վ������
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/20466664/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'RhG26bgwCd7X0eEEXwccY6W=PZA='
      },
      success: function (res) {
        //console.log(res.data)
        //�õ����ݺ󱣴浽ȫ������
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        //��ת������ҳ�棬�����õ������ݻ�ͼ
        wx.navigateTo({
          url: '../wifi_station/tianqi/tianqi',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  change: function (e) {
    //��������ʱ����Ͱ�ť������������ð�ť
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  },

  /**
   * �������ں���--����ҳ�����
   */
  onLoad: function (options) {

  },

  /**
   * �������ں���--����ҳ�������Ⱦ���
   */
  onReady: function () {

  },

  /**
   * �������ں���--����ҳ����ʾ
   */
  onShow: function () {

  },

  /**
   * �������ں���--����ҳ������
   */
  onHide: function () {

  },

  /**
   * �������ں���--����ҳ��ж��
   */
  onUnload: function () {

  },

  /**
   * ҳ������¼�������--�����û���������
   */
  onPullDownRefresh: function () {

  },

  /**
   * ҳ�����������¼��Ĵ�����
   */
  onReachBottom: function () {

  },

  /**
   * �û�������ϽǷ���
   */
  onShareAppMessage: function () {

  }
})
