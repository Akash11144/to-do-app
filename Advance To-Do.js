var tex1=document.getElementById("tex");
var btn1=document.getElementById("btn");
var cardContainer=document.getElementById("divCardContainer");
var ins=[];delV=1;update=0;


function elementCreation(eleToBECreated,parentElement){
    var a=document.createElement(eleToBECreated);
    parentElement.append(a);
    return a;
}
function elementCreationP(eleToBECreated,parentElement){
    var a=document.createElement(eleToBECreated);
    parentElement.prepend(a);
    return a;
}
function taskDate(){
    var a=new Date();
    return a.getDate()+"-"+a.getMonth()+"-"+(a.getFullYear()%2000);
}
function taskTime(){
    var a=new Date();
    return a.getHours()+":"+a.getMinutes()+":"+a.getSeconds();
}
function fetching(){
    var ee=localStorage.getItem("task1")
    if(ee==null)
        alert("browser empty")
    else
        {
            var ee1=JSON.parse(localStorage.getItem("task1"));
            var max=[];
            for(var k=0;k<ee1.length;k++)
            {
                if(ee1=="")
                    continue
                else
                    max.push(ee1[k].cc);
            }
            for(var l=0;l<max.length;l++){
                if(max[l]>max[l+1])
                    {
                        var t1=max[l];
                        max[l]=max[l+1];
                        max[l+1]=t1;
                    }
            }
            delV=max[max.length-1]+1;
            for(var i=0;i<ee1.length;i++)
             {
                 if(ee1[i]=="")
                 {
                     continue
                 }
                 else
                 {
                    createCard(ee1[i].work,ee1[i].dd,ee1[i].tt,ee1[i].cc,ee1[i].uf)
                 }
               
             }
    }
}
fetching();


function createCard(msg,datee,timee,cnt,update1)
{
    var card=elementCreationP("div", cardContainer);
    card.className="card1";
    var textTime=elementCreation("div",card);
    textTime.className="divTextTime";
    var task=elementCreation("input",textTime);
    task.className="input1";
    var dateTime=elementCreation("div",textTime);
    dateTime.className="divDateTime";
    var date1=elementCreation("span", dateTime);
    var time1=elementCreation("span",dateTime);
    var iconContainer=elementCreation("div",card);
    iconContainer.className="divIconContainer";
    var iconEdit=elementCreation("i",iconContainer);
    var iconDel=elementCreation("i",iconContainer);
    var iconUpdate=elementCreation("i",iconContainer);

    task.value=msg;
    task.disabled=true; 
    if(update1==0){
        date1.innerText= "Created at " +datee;
        time1.innerText="  "+"/"+" "+timee;
    }
    else{
        date1.innerText= datee;
        time1.innerText="  "+"/"+" "+timee;
    }


    iconEdit.className="far fa-edit";
    iconDel.className="far fa-trash-alt";
    iconUpdate.className="fas fa-check-double";


    var counter=cnt;
    up=update1;
    ins.push({
        work:msg,
        dd:datee,
        tt:timee,
        cc:counter,
        uf:up
    });
    console.log(ins);

    iconEdit.addEventListener("click",function(){
        task.disabled=false;
        iconEdit.style.fontSize="0";
        iconUpdate.style.fontSize="20px";
    });

    iconUpdate.addEventListener("click",function(){
        up=1;
        task.disabled=true;
        iconEdit.style.fontSize="20px";
        iconUpdate.style.fontSize="0px";
        date1.innerText="";
        time1.innerText="";
        date1.innerText="Updated at " + taskDate();
        time1.innerText="/"+taskTime();
        var f=JSON.parse(localStorage.getItem("task1"));
        for(var i=0;i<f.length;i++){
            var t;
            if(counter==f[i].cc)
            {
                t=i;
                break;
            }
        }
            if(task.value=="")
            {
                 task.value="Enter Task or If task is completed then delete it"
                 ins[i]={
                     work:task.value,
                     dd:date1.innerText,
                     tt:time1.innerText,
                     cc:counter,
                     uf:up
                 };
                 f[i]=ins[i];
                 localStorage.setItem("task1",JSON.stringify(f));
            }
         else{
             ins[i]={
                 work:task.value,
                 dd:date1.innerText,
                 tt:time1.innerText,
                 cc:counter,
                 uf:up
             };
             f[i]=ins[i];
             console.log( f[i])
             console.log(ins[i])
             localStorage.setItem("task1",JSON.stringify(f));
         }
    });
    
    iconDel.addEventListener("click",function(){
        var f=JSON.parse(localStorage.getItem("task1"));
        for(var i=0;i<f.length;i++){
            if(counter==f[i].cc)
            {
                ins[i]="";
                f[i]="";
                localStorage.removeItem("task");
                localStorage.setItem("task1",JSON.stringify(f));
            }
        }
        card.remove();
    });
}

btn1.addEventListener("click",function(e){
    e.preventDefault();
    if(tex1.value=="")
    {
        alert("No Task to Add")
        return;
    }
    createCard(tex1.value,taskDate(),taskTime(),delV,update);
    localStorage.setItem("task1", JSON.stringify(ins));
    ++delV;
   tex1.value="";
});
