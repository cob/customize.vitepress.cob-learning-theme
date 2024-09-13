<template>
  <div class="loading-container">
    <div class="mexican-wave"></div>
  </div>
</template>

<style lang="css">

.loading-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/**
  * Mexican wave
  *
  * @author jh3y - jheytompkins.com
*/
.mexican-wave:before {
  -webkit-animation: mexican-wave .75s infinite ease backwards;
          animation: mexican-wave .75s infinite ease backwards;
  border-radius: 100%;
  content: '';
  height: 10px;
  position: absolute;
  -webkit-transform: translateY(10px);
          transform: translateY(10px);
  width: 10px; }

@-webkit-keyframes mexican-wave {
  0% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  15% {
    -webkit-box-shadow: -30px -20px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -20px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  30% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -20px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -20px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  45% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -20px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -20px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  60% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -20px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -20px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  75% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -20px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -20px 0 0 var(  --vp-c-brand-1); }
  100% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); } }

@keyframes mexican-wave {
  0% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  15% {
    -webkit-box-shadow: -30px -20px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -20px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  30% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -20px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -20px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  45% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -20px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -20px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  60% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -20px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -20px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); }
  75% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -20px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -20px 0 0 var(  --vp-c-brand-1); }
  100% {
    -webkit-box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1);
            box-shadow: -30px -10px 0 0 var(  --vp-c-brand-1), -15px -10px 0 0 var(  --vp-c-brand-1), 0 -10px 0 0 var(  --vp-c-brand-1), 15px -10px 0 0 var(  --vp-c-brand-1), 30px -10px 0 0 var(  --vp-c-brand-1); } }



</style>