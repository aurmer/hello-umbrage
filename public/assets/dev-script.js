;(function () {

  document.querySelector('body').insertAdjacentHTML('afterbegin',`
  <div id="mockup" style="display: none;
                          position: absolute;
                          height: 100vh;
                          width: 100vw;
                          background-image: url('/assets/images/mockup_resize.png');
                          overflow: hidden;">
  `)
  
  window.addEventListener('keydown', (e) => {
    const key = e.keyCode
    const isModified = e.ctrlKey && e.shiftKey
    
    
    if(isModified) {
      if(key===49) viewApp()
      if(key===50) viewMockup()
    }
  })

  const mockupDiv = document.getElementById('mockup')

  function viewApp () {
    console.log('"View App" mode')
    mockupDiv.style.display = "none"
    mockupDiv.style.zIndex = "0"
  }

  function viewMockup () {
    console.log('"View Mockup" mode')
    mockupDiv.style.display = "block"
    mockupDiv.style.zIndex = "10"
  }

})()