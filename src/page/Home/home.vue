<template>
  <div class="home">

  <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;" v-if="!error">
    <div class="banner" >
      <div class="bg" ref="bg"
        @mouseover="bgOver($refs.bg)" @mousemove="bgMove($refs.bg,$event)" @mouseout="bgOut($refs.bg)">
        <transition name="fade">
          <div v-for="(item, i) in banner" v-if="i===mark" :key="i" style="position:absolute" @click="linkTo(item)" @mouseover="stopTimer" @mouseout="startTimer">
            <img v-if="item.picUrl"  class="img3 b" :src="item.picUrl"/>
            <div class="text">{{item.des}}</div>
          </div>
        </transition>
      </div>
<!--      // 幻灯片下面的点-->
      <div class="page">
        <ul class="dots">
          <li class="dot-active" v-for="(item, i) in banner" :class="{ 'dot':i!=mark }" :key="i" @click="change(i)"></li>
        </ul>
      </div>
    </div>
    <div v-for="item in news">
      <div class="new_list">
        <a class="cover-link" :href="item.url"></a>
        <img class="photo" :src="item.picUrl">
        <div class="text">
          <p class="content">{{item.content}}</p>
          <p class="note">{{item.note}}</p>
        </div>
      </div>
    </div>

    <div v-for="(item,i) in home" :key="i" style="display: none">
      <div class="activity-panel" v-if="item.type === 1">
        <ul class="box">
          <li class="content" v-for="(iitem,j) in item.panelContents" :key="j" @click="linkTo(iitem)">
            <img class="i" :src="iitem.picUrl">
            <a class="cover-link"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
<!--    // 错误页面-->
    <div class="no-info" v-if="error">
      <div class="no-data">
        <img src="/static/images/error.png">
        <br> 抱歉！出错了...
      </div>
    </div>


    <el-dialog
      title="通知"
      :visible.sync="dialogVisible"
      width="30%"
      style="width:70%;margin:0 auto">
      <span>首页已升级！XPay个人支付收款系统已上线，赶快去支付体验吧！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getNewsList } from '/api/home.js'
  import YShelf from '/components/shelf'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  import {getStore, setStore} from '/utils/storage.js'

  export default {
    data () {
      return {
        // 用来控制幻灯片的是否显示，在mount中加载数据后就置为true
        error: false,
        banner: [
          {picUrl: 'http://n.sinaimg.cn/sports/180/w640h340/20190527/f328-hxntqyz0553486.jpg', des: '扎哈维，一个中游队的射手王', url: 'https://www.baidu.com'},
          {picUrl: 'http://n.sinaimg.cn/sports/180/w640h340/20190527/e79f-hxntqyz0873137.jpg', des: '贝克汉姆，曼联慈善赛', url: ''},
          {picUrl: 'http://n.sinaimg.cn/sports/180/w640h340/20190527/aa16-hxntqyz0873659.jpg', des: '徐灿，中国拳手再夺金腰带', url: ''}],
        news: [
          {
            picUrl: 'http://k.sinaimg.cn/n/sports/transform/282/w650h432/20190527/a41c-hxntqyz0911593.jpg/w150h100f1t0l0q100syf.jpg',
            content: '归化军团成里皮回归前提 有望短期赶上亚洲一流队',
            note: '2019-05-26 14:10:23 Equalizer',
            url: 'https://www.baidu.com'
          },
          {
            picUrl: 'https://img1.qunliao.info/fastdfs3/M00/68/84/180x135/crop/-/ChO2w1zpOYWAGGc-AAHd33iEeTs041.jpg',
            content: '范戴克专访：坚毅源自曲折的生涯，勤奋终换来理想的回报',
            note: '2019-05-26 14:10:23 Equalizer',
            url: 'https://www.baidu.com'
          }
        ],
        mark: 0,
        bgOpt: {
          px: 0,
          py: 0,
          w: 0,
          h: 0
        },
        home: [],
        loading: false,
        notify: '1',
        dialogVisible: false,
        timer: ''
      }
    },
    methods: {
      autoPlay () {
        this.mark++
        if (this.mark > this.banner.length - 1) {
          // 当遍历到最后一张图片置零
          this.mark = 0
        }
      },
      play () {
        // 每2.5s自动切换
        this.timer = setInterval(this.autoPlay, 2500)
      },
      change (i) {
        this.mark = i
      },
      startTimer () {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      stopTimer () {
        clearInterval(this.timer)
      },
      linkTo (item) {
        this.$router.push({path: '/matchData'})
      },
      bgOver (e) {
        this.bgOpt.px = e.offsetLeft
        this.bgOpt.py = e.offsetTop
        this.bgOpt.w = e.offsetWidth
        this.bgOpt.h = e.offsetHeight
      },
      bgMove (dom, eve) {
        let bgOpt = this.bgOpt
        let X, Y
        let mouseX = eve.pageX - bgOpt.px
        let mouseY = eve.pageY - bgOpt.py
        if (mouseX > bgOpt.w / 2) {
          X = mouseX - (bgOpt.w / 2)
        } else {
          X = mouseX - (bgOpt.w / 2)
        }
        if (mouseY > bgOpt.h / 2) {
          Y = bgOpt.h / 2 - mouseY
        } else {
          Y = bgOpt.h / 2 - mouseY
        }
        dom.style['transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
        dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      },
      bgOut (dom) {
        dom.style['transform'] = 'rotateY(0deg) rotateX(0deg)'
        dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
      },
      showNotify () {
        var value = getStore('notify')
        if (this.notify !== value) {
          this.dialogVisible = true
          setStore('notify', this.notify)
        }
      }
    },
    // 创建后，挂载后执行获取幻灯片数据
    mounted () {
      getNewsList().then(res => {
        if (res.success === false) {
          this.error = true
          return
        }
        this.news = res.data
      })
      // this.showNotify()
    },
    // 创建后执行，设置滚动参数
    created () {
      this.play()
    },
    components: {
      YShelf,
      product,
      mallGoods
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
  }

  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;

    .no-data {
      align-self: center;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .page {
    position: absolute;
    width: 100%;
    top: 470px;
    z-index: 30;

    .dots {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .dot-active {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: whitesmoke;
        border-radius: 8px;
        margin-right: 10px;
        cursor: pointer;
      }

      .dot {
        opacity: 0.2;
      }
    }
  }

  .activity-panel {
    width: 1220px;
    margin: 0 auto;

    .box {
      overflow: hidden;
      position: relative;
      z-index: 0;
      margin-top: 25px;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, .14);
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    }

    .content {
      float: left;
      position: relative;
      box-sizing: border-box;
      width: 25%;
      height: 200px;
      text-align: center;
    }

    .content ::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      box-sizing: border-box;
      border-left: 1px solid #f2f2f2;
      border-left: 1px solid rgba(0, 0, 0, .1);
      width: 100%;
      height: 100%;
      content: "";
      pointer-events: none;
    }

    .i {
      width: 305px;
      height: 200px;
    }

    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
    }

    a {
      color: #5079d9;
      cursor: pointer;
      transition: all .15s ease-out;
      text-decoration: none;
    }

    a:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, .08);
      transition: all .15s ease;
    }
  }

  .new_list {
    display: list-item;
    overflow: hidden;
    margin: 10px auto;
    z-index: 0;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    width: 1220px;
    height: 140px;

    .photo {
      float: left;
      margin-right: 20px;
      padding: 5px;
      width: 180px;
    }

    .cover-link {
      width: inherit;
      height: inherit;
      float: right;
      background: #1a1a1a;
      cursor: pointer;
      position: absolute;
      z-index: 3;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
    }

    a {
      cursor: pointer;
      transition: all .15s ease-out;
      text-decoration: none;
    }

    a:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, .08);
      transition: all .15s ease;
    }

    .text {
      margin-top: 20px;
      height: max-content;

      .note {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      }

      .content {
        font-size: large;
        font-family: "Arial Black", monospace;
        margin-bottom: 50px;
      }

    }
  }

  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHsei";
    transition: all .3s;
    transition-timing-function: linear;
  }

  .banner {
    cursor: pointer;
    perspective: 3000px;
    position: relative;
    z-index: 19;
    margin: 0 auto;
    width: 1220px;
    .text{
      display: block;
      position: relative;
      width: 100%;
      height: 5%;
      z-index: 50;
      color: #f0f0f0;
      margin-top: 440px;
      margin-left: 20px;
      font-size: 35px;
      font-family: "Microsoft Yi Baiti";
    }

  }

  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateY(0deg) rotateX(0deg);

    & div {
      position: relative;
      height: 100%;
      width: 100%;
    }
  }

  .img1 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
    z-index: 15;
  }

  .img2 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background-size: 95% 100%;
    border-radius: 10px;
  }

  .img3 {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
  }

  .a {
    z-index: 20;
    transform: translateZ(40px);
  }

  .b {
    z-index: 20;
    transform: translateZ(30px);
  }

  .c {
    transform: translateZ(0px);
  }

  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;

    > div {
      width: 100%;
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;

      &:hover {
        transform: translateY(-5px);
      }
    }

    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }

    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }

    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }

    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }

    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;

    li {
      flex: 1;

      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;

    > div {
      flex: 1;
      width: 25%;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .imgbanner {
      width: 50%;
      height: 430px;

      .cover-link {
        cursor: pointer;
        display: block;
        position: absolute;
        top: 60px;
        left: 0;
        width: 50%;
        height: 430px;
        z-index: 4;
        background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
      }

      .cover-link:hover {
        box-shadow: inset 0 0 38px rgba(0, 0, 0, .08);
        transition: all .15s ease;
      }
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

</style>
