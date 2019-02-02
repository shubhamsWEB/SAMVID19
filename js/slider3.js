// Function to get a path (string) similar to sin function. Can accept following options that you can use for customization:
// - width: Width to draw the path
// - height: Height to draw the path
// - addWidth: Additional width to overflow actual width
// - controlSep: Bigger values of this parameter will add more curvature, and vice versa
// - curves: Number of curves (iterations) to draw

function getSinPath(options) {
    var _options = options || {};
    var _width = _options.width || window.innerWidth;
    var _height = _options.height || window.innerHeight;
    var _addWidth = _options.addWidth || 500;
    var _controlSep = _options.controlSep || 500;
    var _curves = _options.curves || 3;

    var x = - _addWidth;
    var y = _height / 2;
    var amplitudeX = (_width + _addWidth * 2) / _curves;     // X distance among curve points
    var amplitudeY = _height / 3;                            // Y distance between points and control points

    var path = [];
    path.push('M', x, y);
    var alternateY = true;
    var controlY;
    for (var i = 0; i < _curves; i++) {
        controlY = alternateY ? y - amplitudeY : y + amplitudeY;
        if (i === 0) {
            path.push('C', x + (amplitudeX / 2 - _controlSep), controlY);
        } else {
            path.push('S');
        }
        path.push(x + (amplitudeX / 2 + _controlSep), controlY);
        path.push(x + amplitudeX, y);
        x += amplitudeX;
        alternateY = !alternateY;
    }

    return path.join(' ');
}


(function () {

    // Creating SVG and path elements and insert to DOM

    var svgNS = 'http://www.w3.org/2000/svg';
    var svgEl = document.createElementNS(svgNS, 'svg');

    var pathEl = document.createElementNS(svgNS, 'path');
    // The `getSinPath` function return the `path` in String format
    pathEl.setAttribute('d', getSinPath());
    pathEl.setAttribute('class', 'path-slider__path');

    svgEl.appendChild(pathEl);
    document.body.appendChild(svgEl);


    // Changing `background-image`
    // Firstly, saving the computed `background` of each item, as these are defined in CSS
    // When item is selected, the `background` is set accordingly

    var items = document.querySelectorAll('.path-slider__item');
    var images = [];
    for (var j = 0; j < items.length; j++) {
        images.push(getComputedStyle(items[j].querySelector('.item__circle')).getPropertyValue('background-image'));
    }

    var imgAnimation;
    var lastIndex;
    var setImage = function (index) {
        if (imgAnimation) {
            imgAnimation.pause();
            sliderContainer.style['background-image'] = images[lastIndex];
            sliderContainerBackground.style['opacity'] = 0;
        }
        lastIndex = index;
        sliderContainerBackground.style['background-image'] = images[index];
        imgAnimation = anime({
            targets: sliderContainerBackground,
            opacity: 1,
            easing: 'linear'
        });
    };


    // Adding the extra element needed to fade the images smoothly
    // Also set the image for the initial current item (the first one)

    var sliderContainer = document.querySelector('.path-slider');
    var sliderContainerBackground = document.createElement('div');
    sliderContainerBackground.setAttribute('class', 'path-slider__background');
    setImage(0);
    sliderContainer.appendChild(sliderContainerBackground);


    // Initializing the slider

    var options = {
        startLength: 'center',
        paddingSeparation: 100,
        easing: 'easeOutCubic',
        begin: function (params) {
            // Item get selected, then set the `background` accordingly
            if (params.selected) {
                setImage(params.index);
            }
        }
    };

    var slider = new PathSlider(pathEl, '.path-slider__item', options);


    // Regenerate the SVG `path` and update items position on `resize` event (responsive behavior)

    window.addEventListener('resize', function() {
        pathEl.setAttribute('d', getSinPath());
        slider.updatePositions();
    });

})();
