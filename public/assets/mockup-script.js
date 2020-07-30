
/*
 * Development feature I used to lay out page based on mockup
 * 
 * This feature (and all reference to it) can be removed
 * with the deletion of this file, `public/assets/images/mockup.png`,
 * and the script tag sourcing this file in `public/index.html`
 */


//IIFE
;(function () {

  //add a mockup overlay to the body
  document.querySelector('body').insertAdjacentHTML('afterbegin',`
  <div id="mockup" style="display: none;
                          position: absolute;
                          height: 100vh;
                          width: 100vw;
                          background-image: url('assets/images/mockup.png');
                          z-index: 9999;
                          overflow: hidden;">
  `)

  const mockupDiv = document.getElementById('mockup')
  
  //monitor keydown, only act on Ctrl+Shift+1 and Ctrl+Shift+2
  window.addEventListener('keydown', (e) => {
    const key = e.keyCode
    const isModified = e.ctrlKey && e.shiftKey
    
    
    if(isModified) {
      if(key===49) viewApp()
      if(key===50) viewMockup()
    }
  })

  //hide mockup
  function viewApp () {
    console.log('"View App" mode')
    mockupDiv.style.display = "none"
  }

  //reveal mockup
  function viewMockup () {
    console.log('"View Mockup" mode')
    mockupDiv.style.display = "block"
  }

})()