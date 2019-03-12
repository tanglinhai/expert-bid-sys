<template>
	<div class="foot">
    <a href="http://www.365trade.com.cn/">中招联合</a>
    <span class="c_fnl">|</span>
    <a target="_blank" href="http://www.cntcitc.com.cn/">中招国际</a>
    <span class="c_fnl">|</span>
    <a target="_blank" href="http://shanxi.365trade.com.cn/">中招联合山西</a>
    <span class="c_fnl">|</span>
    <a target="_blank" href="http://hebei.365trade.com.cn/">中招联合河北</a>
    <p class="c_fcopyright">中招联合信息股份有限公司 © 版权所有 京ICP备 15051098</p>
    <p class="c_fcopyright">京公网安备 11010802024617号</p>
  </div>
</template>

<script>
export default {
  name: 'foot',
  props: {}
}
</script>
<style lang="scss">
.foot {
    font-family: PingFangSC-Semibold;
    border-top: 1px solid #e8e8e8;
    padding: 30px;
    margin: 0 auto;
    font-size: 12px;
    text-align: center;
    color: #999;
    background-color: #fff;
    a {
		    color: #a4a4a4;
		}
		.c_fnl {
		    color: #e8e8e8;
		    margin: 0 10px;
		}
		.c_fcopyright {
		    color: #bcbcbc;
		    margin-top: 16px;
		}
}
</style>
