<template>
  <div class="content">
    <Header></Header>
  <div v-for="(item,i) in data">
   <div class="match">
     <div class="host">
       <img class="team_img" :src="item.hostImage">
       <div class="team_name">{{item.host}}</div>
     </div>
     <div class="result">
        <div>{{item.date}}</div>
        <div class="sore">{{item.socre}}</div>
        <div class="state">{{item.state}}</div>
     </div>
     <div class="guest">
       <img class="team_img" :src="item.guestImage">
       <div class="team_name">{{item.guest}}</div>
     </div>
   </div>
     <div class="statistics">
       <div class="title">
         <p>技术统计</p>
       </div>
       <div class="team">
         <div class="host_s">
           <img v-if="item.hostImage"  class="team_img_s" :src="item.hostImage">
           <div class="team_name_s">{{item.host}}</div>
         </div>
         <div class="guest_s">
           <img class="team_img_s" :src="item.guestImage">
           <div class="team_name_s">{{item.guest}}</div>
         </div>
       </div>
       <div v-for="(item,i) in item.statistics">
         <div class="data1">
           <div class="left-value">{{item.host}}</div>
           <div class="note">{{item.note}}</div>
           <div class="right-value">{{item.guest}}</div>
         </div>
       </div>
     </div>
   </div>
   <Footer></Footer>
  </div>
</template>
<script>
  import Header from '/common/header'
  import Footer from '/common/footer'
  export default {
    data () {
      return {
        // 用来控制幻灯片的是否显示，在mount中加载数据后就置为true
        error: false,
        data: [
          {
            host: '皇家马德里',
            hostImage: 'http://image.suning.cn/uimg/SDSP/team/249.png?v=209912316666',
            guest: '皇家贝蒂斯',
            guestImage: 'http://image.suning.cn/uimg/SDSP/team/248.png?v=2099123199999',
            date: '5-28 00:30 西甲',
            socre: '0-2',
            state: '已结束',
            statistics: [
              {
                host: '47%',
                note: '控球率',
                guest: '53%'
              },
              {
                host: '9',
                note: '射门',
                guest: '9'
              },
              {
                host: '2',
                note: '封堵',
                guest: '7'
              },
              {
                host: '4',
                note: '黄牌',
                guest: '1'
              },
              {
                host: '10',
                note: '任意球',
                guest: '15'
              },
              {
                host: '1',
                note: '越位',
                guest: '4'
              },
              {
                host: '1',
                note: '封堵',
                guest: '0'
              },
              {
                host: '1',
                note: '角球',
                guest: '5'
              }

            ]
          },
          {
            host: '皇家马德里',
            hostImage: 'http://image.suning.cn/uimg/SDSP/team/249.png?v=209912316666',
            guest: '皇家贝蒂斯',
            guestImage: 'http://image.suning.cn/uimg/SDSP/team/248.png?v=2099123199999',
            date: '5-28 00:30 西甲',
            socre: '0-2',
            state: '已结束',
            statistics: [
              {
                host: '47%',
                note: '控球率',
                guest: '53%'
              },
              {
                host: '9',
                note: '射门',
                guest: '9'
              },
              {
                host: '2',
                note: '封堵',
                guest: '7'
              },
              {
                host: '4',
                note: '黄牌',
                guest: '1'
              },
              {
                host: '10',
                note: '任意球',
                guest: '15'
              },
              {
                host: '1',
                note: '越位',
                guest: '4'
              },
              {
                host: '1',
                note: '封堵',
                guest: '0'
              },
              {
                host: '1',
                note: '角球',
                guest: '5'
              }

            ]
          }
        ]

      }
    },
    methods: {
      autoPlay () {
        this.mark++
        if (this.mark > this.banner.length - 1) {
          // 当遍历到最后一张图片置零
          this.mark = 0
        }
      }
    },
    // 创建后，挂载后执行获取幻灯片数据
    mounted () {
      // getNewsList().then(res => {
      //   if (res.success === false) {
      //     this.error = true
      //     return
      //   }
      //   this.news = res.data
      // })
      // this.showNotify()
    },
    // 创建后执行，设置滚动参数
    created () {
    },
    components: {
      Footer,
      Header
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  div{
    font-size: 16px;
    font-family: "Helvetica Neue",serif;
    color: #000000;
  }
  .match{
    position: relative;
    margin:0 auto;
    margin-top: 20px;
    height: 160px;
    width: 680px;
    background: url("../../../static/images/bonawu.jpg");
    background-size: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
  }
  .result{
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 16px;
    font-family: "Helvetica Neue",serif;
    .sore{
      margin: 20px 30px;
      font-size: 30px;
    }
    .state{
      margin: 0 42px;
    }
  }

  .host{
    position: inherit;
    float: left;
    height: 120px;
    width: 113px;
    margin-top: 25px;
    margin-left: 145px;
    .team_img{
      height: 75px;
      width: 75px;
    }
    .team_name{
      margin-top: 5px;
      font-size: 16px;
      font-family: "Helvetica Neue",serif;
    }
  }

  .guest{
    position: relative;
    float: left;
    height: 120px;
    width: 113px;
    margin-top: 25px;
    margin-left: 50px;
    .team_img{
      height: 75px;
      width: 75px;
    }
    .team_name{
      margin-top: 5px;
      font-size: 16px;
      font-family: "Helvetica Neue",serif;
    }
  }

  .statistics{

    background: #fff;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    color: #1a1a1a;

    position: relative;
    margin:0 auto;
    margin-top: 30px;
    height: 450px;
    width: 680px;
    .title{
      margin-left: 20px;
      margin-bottom: 50px;
      margin-top: 20px;
    }
    .team{
      margin-left: 120px;
      .host_s{
        float: left;
        margin-right: 240px;
        .team_img_s{
          float: left;
          height: 25px;
          width: 25px;
          margin-right: 5px;
        }
        .team_name_s{
          float: left;
        }

      }
      .guest_s{
        float: left;
        .team_img_s{
          float: left;
          height: 25px;
          width: 25px;
          margin-right: 5px;
        }
        .team_name_s{
          float: left;
        }
      }
    }

    .data1{
      color: #1a1a1a;
      position: inherit;
      margin-top: 70px;
      margin-bottom: 10px;

      .left-value {
        width: 24px;
        text-align: center;
        margin-left: 180px;
        float: left;
      }
      .note{
        font-size: 22px;
        text-align: center;
        width: 88px;
        margin-left: 110px;
        margin-right: 125px;
        float: left;
      }
      .right-value{
        width: 24px;
        text-align: center;
        float: left;
      }

    }

  }



</style>
