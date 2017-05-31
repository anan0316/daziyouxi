/**
 * Created by Administrator on 2017/5/10.
 */
$(function () {
    function Game() {
        this.charArr = [['A', 'img/p1.jpg'],
            ['B', 'img/p2.jpg'],
            ['C', 'img/p3.jpg'],
            ['D', 'img/p4.jpg'],
            ['E', 'img/p5.jpg'],
            ['F', 'img/p6.jpg'],
            ['G', 'img/p7.jpg'],
            ['H', 'img/p8.jpg'],
            ['I', 'img/p9.jpg'],
            ['J', 'img/p10.jpg'],
            ['K', 'img/p11.jpg'],
            ['L', 'img/p12.jpg'],
            ['M', 'img/p13.jpg'],
            ['N', 'img/p14.jpg'],
            ['O', 'img/p15.jpg'],
            ['P', 'img/p16.jpg'],
            ['Q', 'img/p17.jpg'],
            ['R', 'img/p18.jpg'],
            ['S', 'img/p19.jpg'],
            ['T', 'img/p20.jpg'],
            ['U', 'img/p21.jpg'],
            ['V', 'img/p22.jpg'],
            ['W', 'img/p23.jpg'],
            ['X', 'img/p24.jpg'],
            ['Y', 'img/p25.jpg'],
            ['Z', 'img/p26.jpg']];
        this.charLength = 5;
        this.vw = window.innerWidth;
        this.vh = window.innerHeight;
        this.speed = 5;
        this.arr = [];
        this.pos = [];
        this.life = 5;
        this.count = 0;
        this.sm = $('span')[0];
        this.sm.innerText = this.life;
        this.score = $('span')[2];
        this.score.innerText = this.count;
        this.ji=1;
        this.jishu = $('span')[1];
        this.jishu.innerText=this.ji;
        this.guoguanCount=5;
        this.stop=$('.ling')[1];
        this.starts=$('.ling')[0];
    };
    Game.prototype={
        start:function(){
            // 首先要得到若干个元素
            this.getChar(this.charLength);
            this.drop();  
            this.keyClick();
            this.stopGame();
        },
        getChar:function(len){
            for(let i=0;i<len;i++){
                // 得到一个元素
                this.getElement();
            }
        },
        checkRepeat(obj){
            return this.arr.some(function(value,index){
                return obj==value.innerText;
            });
        },
        getElement:function(){
            let num=Math.floor(Math.random()*this.charArr.length);
            // this.charArr[num][0]  this.arr[i]进行比较
            while(this.checkRepeat(this.charArr[num][0])){
                num=Math.floor(Math.random()*this.charArr.length);
            }
            // 想把字母放到页面上，必须先创建一个div，将元素放入这个div中，再把这个div插入到页面中
            let divs=$('<div>');
            divs.innerText=this.charArr[num][0];
            // 获取随机位置
            let tops,lefts;
            do{
                tops= Math.floor(Math.random()*300);
                lefts=Math.random()*(this.vw-200)+100;
            }while(this.gettopLeft(lefts));
            divs.style.cssText=`width: 80px;height:80px;background:url(${this.charArr[num][1]}) no-repeat;background-size: cover;background-position: center center;font-size: 44px;color: #333;font-weight:800;border-radius: 5px;text-align: center;line-height: 80px;position: absolute;top:${tops}px;left:${lefts}px;box-shadow:0 0 20px rgba(0,0,0,0.3);transition:all ease 0.2s;`;
            document.body.appendChild(divs);
            this.arr.push(divs);
            this.pos.push(lefts);
        },
        drop(){
            let self=this;
           self.t=setInterval(function(){
                for(let i=0;i<self.arr.length;i++){
                    self.arr[i].style.top=self.arr[i].offsetTop+self.speed+'px';
                        if(self.arr[i].offsetTop>500){
                            document.body.removeChild(self.arr[i]);
                            self.arr.splice(i,1);
                            self.pos.splice(i,1);
                            self.life--;
                            self.sm.innerText=self.life;
                            if(self.life<0){
                                let flag=window.confirm('再接再厉，加油！');
                                if(flag){
                                    self.reStart();
                                }else{
                                    close();
                                }
                            }
                        }
                    }
                if(self.arr.length<self.charLength){
                    self.getElement();
                }
            },100);
        },
        keyClick:function(){
            document.body.onkeydown=function(e){
                // 键盘按下时，获取键盘按下的字符
                let code=String.fromCharCode(e.keyCode);
                let self=this;
                self.arr.forEach(function(value,index){
                    if(code==value.innerText){
                        document.body.removeChild(value);
                        self.arr.splice(index,1);
                        self.pos.splice(index,1);
                        self.count++;
                        self.score.innerText=self.count;
                        if(self.count==self.guoguanCount){
                            self.ji++;
                            self.ji.innerText=self.ji;
                            console.log(self.ji);
                            self.next();
                        }
                    }

                });
                if(self.charLength>self.arr.length){
                    self.getElement();
                }
            }.bind(this);
        },
        gettopLeft(l){
            let self=this;
            return self.pos.some(function(value,index){
                return l+80>value && l<value+80;
            });
        },
        reStart(){
            // 停止
            clearInterval(this.t);
            //把所有页面上的元素删除
            for(let i=0;i<this.arr.length;i++){
                document.body.removeChild(this.arr[i]);
            }
            // 数组中存在的元素清空
            this.arr=[];
            this.pos=[];
            // 生命和分数恢复初始值
            this.count = 0;
            this.life = 5;
            this.sm.innerText = this.life;
            this.score.innerText = this.count;
            this.charLength=5;
            this.ji=1;
            this.jishu.innerText=this.ji;
            this.speed=5;
            this.guoguanCount=5;
            this.start();
        },
        next(){
            // 停止
            clearInterval(this.t);
            //把所有页面上的元素删除
            for(let i=0;i<this.arr.length;i++){
                document.body.removeChild(this.arr[i]);
            }
            // 数组中存在的元素清空
            this.arr=[];
            this.pos=[];
            // 生命和分数恢复初始值
            this.life = 5;
            this.sm.innerText = this.life;
            // 设置字母个数
            this.charLength++;
            if(this.ji>=8){
                this.charLength=10;
            }
            this.jishu.innerText=this.ji;
            this.speed=this.speed+1;
            this.guoguanCount=5*this.ji;
            this.start();
        },
        stopGame(){
            console.log(this);
            this.stop.onclick=function(e){
                console.log(this.stop);
                this.stop.style.display='none';
                this.starts.style.display='block';
                clearInterval(this.t);
            }.bind(this);
            this.starts.onclick=function(e){
                let self=this;
                console.log(self.stop);
                this.stop.style.display='block';
                this.starts.style.display='none';
                self.t=setInterval(function(){
                for(let i=0;i<self.arr.length;i++){
                    self.arr[i].style.top=self.arr[i].offsetTop+self.speed+'px';
                        if(self.arr[i].offsetTop>500){
                            document.body.removeChild(self.arr[i]);
                            self.arr.splice(i,1);
                            self.pos.splice(i,1);
                            self.life--;
                            self.sm.innerText=self.life;
                            if(self.life<0){
                                let flag=window.confirm('再接再厉，加油！');
                                if(flag){
                                    self.reStart();
                                }else{
                                    close();
                                }
                            }
                        }
                    }
                if(self.arr.length<self.charLength){
                    self.getElement();
                }
            },100);
            }.bind(this);
        }
    };
    let ele=new Game();
    let btn=$('button')[0];
    let hot=$('.hot');
    let ling=$('.ling');
    
    btn.onclick=function(){

        ele.start();
        for(let i=0;i<hot.length;i++){
            hot[i].style.opacity='1';
        }
        ling[1].style.display='block';
        btn.style.opacity='0';
    }
    
});
