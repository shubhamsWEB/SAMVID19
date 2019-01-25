$(document).ready(function() {                            
      
    Tweene.defaultTimeUnit = 's';
    
    var $rocket = $('.rocket'),
        $scene = $('.scene'),
        $axis1 = $('.axis1'),
        $axis2 = $('.axis2'),
        $axis3 = $('.axis3'),
        $axis4 = $('.axis4'),
        $philae = $('.philae'),
        $body = $('body'),
        t = null;
        
    var animate = function(driver)
    {
        if(t)
        {
            t.pause();
        }
      
        Tweene.defaultDriver = driver;
        
        t = Tweene.line({speed: 1.5});
        
        Tweene.set($body, {backgroundColor: '#636161'});
        Tweene.set($scene, {x: 0, y: -3600, scale: 0.8});
        Tweene.set($axis1, {x: 100, y: 4930});
        Tweene.set($axis1, {rotate: 0});
        Tweene.set($axis2, {rotate: 0});
        Tweene.set($axis3, {rotate: 0});
        Tweene.set($axis4, {rotate: 0});
        Tweene.set($philae, {x: 0, y:0, rotate: 0});

        t
            .to($axis1, {y: 4600, duration: 3, easing: 'easeInQuart'}, 0.5)
            .to($axis1, {rotate: 50, duration: 2, easing: 'linear'})
            .to($axis1, {rotate: 60, x: '+=1000', y: '-=700', duration: 4, easing: 'linear'})
            .to($axis2, {rotate: -140, duration: 6, easing: 'linear'})
            .to($axis1, {x: '-=800', y: '-=300', duration: 2.6, easing: 'linear'})
            .to($axis3, {rotate: 150, duration: 3, easing: 'linear'})
            .to($axis1, {x: '+=1000', y: '-=300', duration: 3, easing: 'linear'})
            .to($axis4, {rotate: 730, duration: 17, easing: 'easeOutQuad'})
            .to($philae, {x: 260, y:10, rotate: -90, duration: 4, easing: 'linear'}, '+=1')
            .to($philae, {x: 245, y:20, duration: 1, easing: 'easeOutQuad'})
            .to($philae, {x: 261, y:25, duration: 1, easing: 'easeInQuad'}, '+=0.2')
        
            .to($body, {backgroundColor: '#000', duration: 10, easing: 'linear'}, 3)
        
            // nested dedicated timeline
            .add(
                Tweene.line($scene)
                    .to({x: '-=100', y: '+=550', duration: 2.8, easing: 'linear'})
                    .to({x: '-=750', y: '+=750', scale: 0.75, duration: 3, easing: 'linear'})
                    .to({x: '-=300', y: '+=700', duration: 3, easing: 'linear'})
                    .to({x: '+=750', y: '+=700', scale: 0.60, duration: 4, easing: 'linear'})
                    .to({x: '+=450', y: '+=330', duration: 2.8, easing: 'linear'})
                    .to({x: '-=30', y: '+=40', duration: 0.5, easing: 'linear'})
                    .to({x: '-=300', y: '+=380', duration: 3.5, easing: 'linear'})
                    .to({x: '-=200', duration: 3, easing: 'linear'})
                    .to({x: '-=700', y: '-=190', scale: 1, duration: 10, easing: 'easeOutSine'})                   
                , 3
            )                
        
            .play();
    };
    

    $('.controls span').on('click', function(event){
        var action = $(this).data('action');

        t[action]();
        event.stopPropagation();
        event.preventDefault();
    });
    
    $('.driverControls li').on('click', function(event){
        var $this = $(this);
        if(!$this.is('.current'))
        {
            var newDriver = $this.data('driver');
            $this.parent().find('.current').removeClass('current');
            $this.addClass('current');
            animate(newDriver);
        }
        event.stopPropagation();
        event.preventDefault();
    });
    
    animate('gsap');
});
