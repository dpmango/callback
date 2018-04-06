document.addEventListener('DOMContentLoaded', function(){

  ////////////////
  // MODALS
  ///////////////

  // show modal
  [].forEach.call(document.querySelectorAll("[js-modal]"), function(el){
    el.addEventListener('click', function(e) {
      var target = el.getAttribute('href');
      showModal(target);
    });
  });

  // close
  [].forEach.call(document.querySelectorAll("[js-close-modal]"), function(el){
    el.addEventListener('click', function(e) {
      var targetModal = e.target.closest('.modal');
      hideModal( "#" + targetModal.getAttribute('id') );
    })
  })

  // close if click outside wrapper
  document.addEventListener('click', function(e){
    if ( !e.target.closest('.modal__wrapper') ){
      var targetModal = e.target.closest('.modal');
      if (targetModal){
        hideModal( "#" + targetModal.getAttribute('id') );
      }
    }
  })

  function showModal(id){
    // hide prev before
    [].forEach.call(document.querySelectorAll(".modal"), function(modal){
      modal.classList.remove('is-active');
    })

    document.querySelector(id).classList.add('is-active');
    document.querySelector('.modal-bg').classList.add('is-active');
  }

  function hideModal(id){
    var target = document.querySelector(id)
    target.classList.add('is-removing');
    setTimeout(function(){
      target.classList.remove('is-active');
      target.classList.remove('is-removing');
      document.querySelector('.modal-bg').classList.remove('is-active');
    }, 300) // removal delay for animation
  }


});


// HELPER FUNCTIONS

function outerWidth(el) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
}

var transformProp = (function(){
  var testEl = document.createElement('div');
  if(testEl.style.transform == null) {
    var vendors = ['Webkit', 'Moz', 'ms'];
    for(var vendor in vendors) {
      if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
        return vendors[vendor] + 'Transform';
      }
    }
  }
  return 'transform';
})();

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);
