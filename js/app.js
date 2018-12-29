class App {
    constructor(){
        console.log('start app...');

        // elements
        this.DOM = {el:document.querySelector('body')};
        this.DOM.app = this.DOM.el.querySelectorAll('.app');
        this.DOM.image = this.DOM.el.querySelectorAll('.image');
        this.DOM.title = this.DOM.el.querySelectorAll('.title');
        this.DOM.bg = this.DOM.el.querySelectorAll('.bg');
        this.DOM.logo = this.DOM.el.querySelectorAll('.logo');
        this.DOM.controls = this.DOM.el.querySelectorAll('.controls');
        this.DOM.info = this.DOM.el.querySelector('.info');
        this.DOM.about = this.DOM.el.querySelector('.about');

        // settings
        this.direction = 'next';
        this.animationLock = false;
        this.config = {
            animation: {
                speed: {fast: 0.3, medium: 0.5, slow: 0.7},
                ease: {power01: 'Power2.easeInOut', quint01: 'Quint.easeOut'}
            }
        };
        this.current = 0;

        //photos db
        this.photos = [
            'alan-king-319143-unsplash.jpg',
            'alex-iby-317332-unsplash.jpg',
            'brunel-johnson-381896-unsplash.jpg',
            'candice-picard-808304-unsplash.jpg',
            'freestocks-org-197295-unsplash.jpg',
            'tamara-bellis-262617-unsplash.jpg',
            'tamara-bellis-427162-unsplash.jpg',
        ];

        //start animations
        this.startStage();
    }


    startStage(){
        var tlIntro = new TimelineMax({onComplete: () => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        this.setImage();

            tlIntro
            .from(this.DOM.logo,this.config.animation.speed.fast,{
                top: '-10em',
            },0)
            .from(this.DOM.controls,this.config.animation.speed.fast,{
                bottom: '-10em',
            },.5)
            .from(this.DOM.info,this.config.animation.speed.fast,{
                top: '-10em',
            },.6)
            .from(this.DOM.image,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .50)
            .from(this.DOM.bg,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .6)
            .from(this.DOM.title,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .3)
            ;
        
    }

    prevSlide(){
        if(this.isAnimationUnlocked()){
            this.setCurrentDown()
            this.setDirection({mode:'prev'});
            this.exitSlide();
            console.log(this.getCurrent());
        }
    }

    nextSlide(){
        if(this.isAnimationUnlocked()){
            this.setCurrentUp()
            this.setDirection({mode:'next'});
            this.exitSlide();
            console.log(this.getCurrent());
        }
    }

    exitSlide(){
        this.setAnimationLock();
        var tl = new TimelineMax({onComplete:() => this.enterSlide(),repeat:0,ease: this.config.animation.ease.power01});

        tl
        .to(this.DOM.image,this.config.animation.speed.slow,{
            left: this.isDirectionNext() ? '-100%' : '150%',
            transform: 'skewX(30deg)',
        },this.isDirectionNext() ? .2 : .2)
        .to(this.DOM.bg,this.config.animation.speed.slow,{
            left: this.isDirectionNext() ? '-100%' : '150%',
            transform: 'skewX(30deg)',
        },this.isDirectionNext() ? .3 : 0)
        .to(this.DOM.title,this.config.animation.speed.slow,{
            left: this.isDirectionNext() ? '-100%' : '150%',
            transform: 'skewX(30deg)',
        },this.isDirectionNext() ? 0 : .3)
        ;
    }

    enterSlide(){

        this.setImage();

        var tl = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        tl
        .set(this.DOM.image,{
            left: this.isDirectionNext() ? '150%' : '-150%',
            transform: 'skewX(30deg)',
        })
        .set(this.DOM.bg,{
            left: this.isDirectionNext() ? '150%' : '-150%',
            transform: 'skewX(30deg)',
        })
        .set(this.DOM.title,{
            left: this.isDirectionNext() ? '150%' : '-150%',
            transform: 'skewX(30deg)',
        })
        .to(this.DOM.image,this.config.animation.speed.slow,{
            left: '25%',
            transform: 'skewX(0deg)',
        },this.isDirectionNext() ? .2 : .2)
        .to(this.DOM.bg,this.config.animation.speed.slow,{
            left: '30%',
            transform: 'skewX(0deg)',
        },this.isDirectionNext() ? .3 : 0)
        .to(this.DOM.title,this.config.animation.speed.slow,{
            left: '25%',
            transform: 'skewX(0deg)',
        },this.isDirectionNext() ? 0 : .3) 
        ;
        this.setAnimationUnlock();
    }

    openAbout(){

        var tl = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        tl
        .to(this.DOM.about,this.config.animation.speed.fast,{
            right: '0',
        })
        ;

    }

    closeAbout(){

        var tl = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        tl
        .to(this.DOM.about,this.config.animation.speed.fast,{
            right: '-50vw',
        })
        ;
    }



/****
 * helpers
 */

getDirection(){
    return this.direction;
}

setDirection({mode = 'next'}){
    this.direction = mode;
}

isDirectionNext(){
    return this.direction === 'next';
}

setAnimationLock(){
    return this.animationLock = true;
}

setAnimationUnlock(){
    return this.animationLock = false;
}

isAnimationLocked(){
    return this.animationLock === true;
}

isAnimationUnlocked(){
    return this.animationLock === false;
}

getCurrent(){
    return this.current;
}

setCurrentUp(){
    return this.getCurrent() === this.photos.length - 1 ? this.current = 0 : this.current++;
}

setCurrentDown(){
    return this.getCurrent() === 0 ? this.current = this.photos.length - 1 : this.current--;
}

setImage(){
    this.DOM.image[0].style.backgroundImage = `url('./images/gallery/${this.photos[this.getCurrent()]}')`;
}

    

}

const app = new App();

const nextSlide = function(){
    app.nextSlide();
}

const prevSlide = function(){
    app.prevSlide();
}

const openAbout = function(){
    app.openAbout();
}

const closeAbout = function(){
    app.closeAbout();
}
