import {data} from './data.js';
import {createElement} from './create_element.js';

window.document.addEventListener("DOMContentLoaded",function(){
    let nav_HTML = document.querySelectorAll(".nav_button")
    let dailyId = document.getElementById("daily")
    dailyId.classList.add("nav_button-active")

    let articles_HTML = document.querySelectorAll(".article")
    nav_HTML.forEach((currentValue) => {
        let timeframes = currentValue

        timeframes.addEventListener("click",function(e){
            let article__frame_HTML = document.querySelectorAll(".article__frame")
            let targetId = e.target.id
            article__frame_HTML.forEach( currentValue => {
                let classSplit = currentValue.className.split(" ")
                currentValue.classList.remove("articles__active")
                currentValue.setAttribute("aria-hidden","true")
                if(targetId == classSplit[1]){
                    currentValue.classList.add("articles__active")
                    currentValue.setAttribute("aria-hidden","false")
                }
            });
            nav_HTML.forEach((currentValue) => {
                let button = currentValue
                if(button.id == targetId){
                    button.classList.add("nav_button-active")
                    button.setAttribute("aria-expanded", "true");
                }else{
                    button.classList.remove("nav_button-active")
                    button.setAttribute("aria-expanded", "false");
                }
            });
            
        });
    });

    function renderData(renderArticlesData,articleParent){
        let mapear = renderArticlesData.map(timeframes => timeframes.timeframes)
        let frameId = 0
        for (const timeframes in mapear) {
            for (const framesKey in mapear[timeframes]) {
                let article_Frame_JS = createElement("article")
                
                let div_top_JS = createElement("div")
                let div_bottom_JS = createElement("div")
                let title_JS = createElement("h2")
                let hrs_JS = createElement("h3")
                let last_hrs_JS = createElement("p")
                let articles_nav = createElement("div")
                let articles_nav_circle_one = createElement("div")
                let articles_nav_circle_two = createElement("div")
                let articles_nav_circle_three = createElement("div")

                articles_nav.className = "articles__nav"

                articles_nav_circle_one.className = "articles__nav-circle"
                articles_nav_circle_two.className = "articles__nav-circle"
                articles_nav_circle_three.className = "articles__nav-circle"

                div_top_JS.className = "flex justify-between align-center"
                div_bottom_JS.className = "frame-bottom flex justify-between align-center"
                

                title_JS.className = "articles__frame_title"
                title_JS.textContent = articleParent.title

                hrs_JS.textContent = mapear[timeframes][framesKey].current + "hrs"
                hrs_JS.className ="articles__frame_hours"

                if(Object.keys(mapear[timeframes])[frameId] == "daily" ){
                    last_hrs_JS.textContent ="Last Daily - "+ mapear[timeframes][framesKey].previous  + "hrs"
                    article_Frame_JS.className = `article__frame ${Object.keys(mapear[timeframes])[frameId]} articles__active`
                    article_Frame_JS.setAttribute("aria-hidden","false")
                }
                if(Object.keys(mapear[timeframes])[frameId] == "weekly"){
                    last_hrs_JS.textContent ="Last Weekly - "+ mapear[timeframes][framesKey].previous  + "hrs"
                    article_Frame_JS.className = `article__frame ${Object.keys(mapear[timeframes])[frameId]}`
                    article_Frame_JS.setAttribute("aria-hidden","true")
                }
                if(Object.keys(mapear[timeframes])[frameId] == "monthly"){
                    last_hrs_JS.textContent ="Last Monthly - "+ mapear[timeframes][framesKey].previous  + "hrs"
                    article_Frame_JS.className = `article__frame ${Object.keys(mapear[timeframes])[frameId]}`
                    article_Frame_JS.setAttribute("aria-hidden","true")
                }else{
                    

                }
                
                
                last_hrs_JS.className = "articles__frame_last"
                

                frameId += 1
                article_Frame_JS.insertAdjacentElement('afterbegin',div_top_JS)
                article_Frame_JS.insertAdjacentElement('beforeend',div_bottom_JS)

                div_top_JS.insertAdjacentElement("afterbegin",title_JS)
                div_top_JS.insertAdjacentElement("beforeend",articles_nav)

                div_bottom_JS.insertAdjacentElement('afterbegin',hrs_JS)
                div_bottom_JS.insertAdjacentElement('beforeend',last_hrs_JS)

                articles_nav.insertAdjacentElement("afterbegin",articles_nav_circle_one)
                articles_nav.insertAdjacentElement("beforeend",articles_nav_circle_two)
                articles_nav.insertAdjacentElement("beforeend",articles_nav_circle_three)

                articleParent.insertAdjacentElement("afterbegin",article_Frame_JS)
            }
            
        }
    }

    articles_HTML.forEach((articlesParent) => {
        let title = articlesParent.title
        let articlesRender = data.filter(title_filter => title_filter.title == title)
        renderData(articlesRender,articlesParent)
    })

});
