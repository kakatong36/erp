<template>
    <div>
        <div class='introduction'>
            <div class='upperPart'>
                <img src="./assets/leftImg.png">
                <div class='introContent'>
                    <span>从未如此方便</span>
                    <div>切合珠宝行业</div>
                    <p>完美切合珠宝行业多变复杂的价格计算方式、复杂的加盈零售连锁店铺架构特点，重<br>
                        视搭建ERP系统，整合公司上下层资产管理、财务官管理、会负管理系统，多角色权限<br>
                        管控，让管理层省心省时省事。
                    </p>
                    <p>通过Wi-Fi或蓝牙等无线电讯号识别展厅展台的货品基础数据，大大提高销告以及盘点<br>
                        的时间，提高准确率和安全性。
                    </p>
                </div>
            </div>
            <div class='nextPart'>
                <div class='introContent'>
                    <span>度身定制 &bull; 专属打造</span>
                    <div>专属顾问与私人订制</div>
                    <p>在体验上，定制平台关注每个与顾客的连接点，并努力尝试从各个维度提供更加私人<br>
                        化的服务，包括提供专属珠宝顾问与私人定制服务。以专业的运营能力积极推动一场<br>
                        涉及理念、风格与体验的变革。颠覆性的商业模式，以更低的价格提供更优的品质。
                    </p>
                    <p>
                        在钻石领域，我们位于上游贸易环节，拥有第一手货源渠道，与国际钻石供货商建立<br>
                        长期战略合作，深入世界各地的钻石交易地，同时以最优惠的价格回馈客户，提供真<br>
                        诚服务。中国珠宝策源地深圳资深工厂直营专业服务。通过整合珠宝产业链，平台对<br>
                        宝石采购、设计与制作各个环节都深度渗透，全渠道运营的理念，则让厂家更加贴近<br>
                        顾客目标。
                    </p>
                </div>
                <img src="./assets/rightImg.png">
            </div>
        </div>
        <div class='pageFooter'>
            <ul>
                <li>
                    <a href="http://www.miitbeian.gov.cn" target="_blank" class='jump'>网站备案/许可证号： 粤ICP备17142766号</a> 
                </li>
                <li>
                    <a class='jump'>&copy; 深圳市微聚信息技术有限公司 2017</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
   name: 'commonBg',
   data (){
       return {

       }
   }
}
</script>
<style>

/*下半部分的样式*/
.introduction,.pageFooter{
    width: 100%;
}
.upperPart,.nextPart{
    width: 74%;
    margin: 0 auto;
    overflow: hidden;
}
.upperPart>img{
    width: 50%;
    float: left;
}
.nextPart>img{
    width: 50%;
    float: right;
}
.introContent{
    float: left;
    height: 100%;
    padding: 1% 0 0 1%;
    width: 50%;
    text-align: left;
    font-size: 1.2em;
    border: 1px solid red;
}
.introContent p{
    margin: 3% 0 5%;
}
.introContent span{
    color: rgb(141,141,141);
}
.introContent>div{
    font-size: 3vh;
    font-weight: bold;
    margin: 1% 0;
}
.pageFooter{
    margin: 1% 0 0;
    text-align: center;
    background: rgb(24,22,35);
}
.pageFooter ul{
    padding: 1% 0;
}
.pageFooter a{
    color: rgba(255,255,255,0.8);
    font-weight: 400;
    font-size: .8rem;
    font-family:"Segoe UI", Segoe, Tahoma, Arial, Verdana, sans-serif;
    text-decoration: none;
}

</style>


