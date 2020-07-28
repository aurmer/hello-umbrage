;(function () {

  document.querySelector('body').insertAdjacentHTML('afterbegin',`
  <div id="mockup" style="display: none;
                          position: absolute;
                          height: 100vh;
                          width: 100vw;
                          background-image: url('/assets/images/main_screen_resize.png');">
  `)
  
  window.addEventListener('keydown', (e) => {
    const key = e.keyCode
    const isCtrl = e.ctrlKey
    
    if(isCtrl) {
      if(key===49) viewApp()
      if(key===50) viewMockup()
      if(key===51) viewMockupBehindApp()
    }
  })

  function viewApp () {
    console.log('"View App" mode')
    document.getElementById('mockup').style.display = "none"
    document.querySelector('body').style.backgroundImage = ``
  }

  function viewMockup () {
    console.log('"View Mockup" mode')
      document.getElementById('mockup').style.display = "block"
      document.querySelector('body').style.backgroundImage = ``
  }

  function viewMockupBehindApp () {
    console.log('"View Mockup behind App" mode')
      document.getElementById('mockup').style.display = "none"
      document.querySelector('body').style.backgroundImage = `url("/assets/images/main_screen_resize.png")`
  }

})()