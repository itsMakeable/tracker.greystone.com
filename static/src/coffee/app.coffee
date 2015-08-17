###*
 * START APP.JS
###

MKBL = {}

MKBL.toggleActivation = (el, elClass) ->
	elClass = elClass || 'is-active'
	$(el).toggleClass(elClass)

$ ->
	MKBL.toggleActivation('body')
	$divs = $('.main-sidebar, .main-main')

textarea = document.getElementById('textarea')
heightLimit = 200

### Maximum height: 200px ###

textarea.oninput = ->
  textarea.style.height = ''

  ### Reset the height###

  textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + 'px'
  return