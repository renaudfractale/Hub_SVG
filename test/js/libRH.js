 class RH_GetParameter {
           constructor(window,document)
           {
                var w = window;
                var d = document;
                var e = d.documentElement;
                var g = d.getElementsByTagName('body')[0]; 
               
                this.x =  Math.max(e.clientWidth,800) ; //g.clientWidth ;//|| w.innerWidth || e.clientWidth;
                this.y =  Math.max(e.clientHeight,800) ; //g.clientHeight ;//w.innerHeight || e.clientHeight ;
                //alert( "x = "  + g.clientWidth + " x " +  w.innerWidth + " x " +  e.clientWidth);
               //alert( "y = "  + g.clientHeight + " x " +  w.innerHeight + " x " +  e.clientHeight);
               //alert( "y = "  + g.clientHeight + " x " +  w.innerHeight + " x " +  e.clientHeight);
               
               
                this.xCenter = this.x/2;
                this.yCenter = this.y/2;
               
               //alert(this.xCenter + " vs " + this.yCenter)
           }
       }
       class Point{
            constructor(x,y){
                this.x=x;
                this.y=y;
            }
            Rotate(theta,cx,cy){
                var X=this.x-cx;
                var Y=this.y-cy;
                
                var R=Math.sqrt((X*X)+(Y*Y));
                
                var Angle = Math.atan2(Y,X);
                
                this.x=R*Math.cos(Angle+theta)+cx;
                this.y=R*Math.sin(Angle+theta)+cy;
                                
            }
            
        }
        
        
        class tracePath {
            constructor(NbGroups,NoGroups,Rmain,Rmax,color,Offset){
            //
            var R1=(Rmax*3);
            var D2= (Rmain*2);
            var D1=R1*2;
            //

            var P1=new Point(R1+RH_Parameters.xCenter-R1,D2+RH_Parameters.yCenter-D2/2)
            //alert(P1.x+" vs "+P1.y)
            var P2=new Point(D1+RH_Parameters.xCenter-R1,D2+RH_Parameters.yCenter-D2/2)

            var P3=new Point(D1+RH_Parameters.xCenter-R1,0+RH_Parameters.yCenter-D2/2)

            var P4=new Point(R1+RH_Parameters.xCenter-R1,0+RH_Parameters.yCenter-D2/2);
            
            var P5=new Point(0+RH_Parameters.xCenter-R1,0+RH_Parameters.yCenter-D2/2);
            
            var P6=new Point(0+RH_Parameters.xCenter-R1,D2+RH_Parameters.yCenter-D2/2);
            
            var PasAngle = -(2*Math.PI)/NbGroups*NoGroups+Offset;
            
            P1.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            P2.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            P3.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            P4.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            P5.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            P6.Rotate(PasAngle,RH_Parameters.xCenter,RH_Parameters.yCenter)
            
            var Paths1 = draw.path("M"+P1.x+" "+P1.y+" C "+P2.x+" "+P2.y+", "+P3.x+" "+P3.y+", "+P4.x+" "+P4.y+""+ " M"+P4.x+" "+P4.y+" C "+P5.x+" "+P5.y+", "+P6.x+" "+P6.y+", "+P1.x+" "+P1.y).fill('none').stroke({ color: color, width: 4, linecap: 'round', linejoin: 'round' })


            return Paths1;        
        }
        }
       
       
        class RH_Interface {
            constructor(ListImg,Listlink,Rmain,Rmax,stateM,Siteweb) {
                this.ListImg=ListImg;
                this.Listlink=Listlink;
                this.Rmain=Rmain;
                this.Rmax=Rmax;
                this.stateM=stateM;
                this.Siteweb=Siteweb;
            }
            compute(){
                var PasMain=(2*Math.PI)/this.ListImg.length;
                var NbPas = this.ListImg.length;
                var xCenter= this.Rmain;
                var yCenter= this.Rmain;
                var Siteweb = this.Siteweb;
                var Im=[];
                var sizeImag=this.Rmax*Math.sqrt(2);
                var Name="";
                for(var i=0;i<NbPas;i++){
                    var PosX=RH_Parameters.x-sizeImag;
                    var PosY=0;
                    Name=this.Listlink[i]; Im.push(draw.image(this.ListImg[i]).size(sizeImag,sizeImag).move(PosX,PosY));
                    Im[Im.length-1]["Im"]= this.Listlink[i];
                    Im[Im.length-1].click(function() { window.open("https://"+this.Im+"."+Siteweb, '_blank')} )
                }
                
                
                if(this.stateM==true){
                    for(var i=0; i< NbPas;i++){
                        var CenterX = RH_Parameters.xCenter - Math.sin(PasMain*i)*this.Rmain;
                        var CenterY = RH_Parameters.yCenter - Math.cos(PasMain*i)*this.Rmain;
                        Im[i].center(CenterX,CenterY);
                    }
                }
                else{
                    for(var i=0; i< NbPas;i++){
                        var CenterX = RH_Parameters.xCenter - Math.sin(PasMain*i)*this.Rmain;
                        var CenterY = RH_Parameters.yCenter - Math.cos(PasMain*i)*this.Rmain;
                        Im[i].animate(3000).center(CenterX,CenterY);;
                    }
                }
            
                
                
                return Im;
            }
        }
  
       class RH_groups {
            constructor(ListImg,Listlink,NbGroups,NoGroups,Rmain,Rmax,stateM,stateL,color,Siteweb)
            {
                this.ListImg=ListImg;
                this.Listlink=Listlink;
                this.NbGroups=NbGroups;
                this.NoGroups=NoGroups;
                this.Rmain=Rmain;
                this.Rmax=Rmax;
                this.stateM=stateM;
                this.stateL=stateL;
                this.color=color;
                this.Rmin = Rmax/4;
                this.Rext = this.Rmin*1.5;
                this.Rint= this.Rmax-(this.Rext);
                this.Siteweb=Siteweb;
            }
        
             get groups() {
                return this.group;
             }
        
            groups_compute() {
                var Siteweb = this.Siteweb;
                
                var PasMain=(2*Math.PI)/this.NbGroups;
                var PasInt=(2*Math.PI)/this.ListImg.length;

                var group = draw.group()

                var xCenter= this.Rmax;
                var yCenter= this.Rmax;


                var CenterX = RH_Parameters.xCenter + Math.sin(PasMain*this.NoGroups)*this.Rmain;
                var CenterY = RH_Parameters.yCenter + Math.cos(PasMain*this.NoGroups)*this.Rmain;

                //Parameter 
                var Rmax = this.Rmax;
                var Rmin = this.Rmin;

                var color = this.color;

                var Rext = this.Rext;
                var Rint = this.Rint;

                var ListImg = this.ListImg;
                var Listlink = this.Listlink;
                //alert(Listlink + " == " +this.Listlink )
                //Cchildren
                    var Ar=[];
                    for (var i = 0; i < this.ListImg.length; i++) {
                        Ar.push( draw.circle(Rext*2).fill(color).center(xCenter+Math.sin(PasInt*i)*Rint,yCenter+Math.cos(PasInt*i)*Rint)) 
                    }

                //C main
                    var R=this.Rmax;
                    if (this.stateL==true) { R=this.Rmin}

                    var CMain = draw.circle(R*2).fill(color).center(xCenter,yCenter);

                    CMain.click(function() { if(this.width()==Rmax*2){this.animate().size(Rmin*2)} else {this.animate().size(Rmax*2)} })

                //Image
                    var Im=[];
                    for (var i = 0; i < this.ListImg.length; i++) {
                        Im.push(draw.image(ListImg[i]).size(Rext*Math.sqrt(2),Rext*Math.sqrt(2)).center(xCenter+Math.sin(PasInt*i)*Rint,yCenter+Math.cos(PasInt*i)*Rint))
                        Im[Im.length-1]["Im"]= Listlink[i];
                        Im[Im.length-1].click(function() { window.open("https://"+this.Im+"."+Siteweb, '_blank')} )


                    }
                    group.add(CMain);
                    for (var i = 0; i < this.ListImg.length; i++) {
                        group.add(Ar[i]);
                        group.add(Im[i]);
                    }
                if(this.stateM==true)
                {
                    group.center(CenterX,CenterY);
                }
                else
                {
                    group.animate(3000).center(CenterX,CenterY);
                }


                return group;
            }
       }
    