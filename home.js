const totalIssue = document.getElementById("total-issue")
const allBtns = document.querySelectorAll("#btnsDiv button");
 const loadingSpiner = document.getElementById("loading-spinner")

 function showLoading(){
  loadingSpiner.classList.remove("hidden")
 }
 function hideLoading(){
  loadingSpiner.classList.add("hidden")
 }

allBtns.forEach((btn, index) => {
  if(index === 0){
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-outline");
  } else {
    btn.classList.add("btn-outline");
    btn.classList.remove("btn-primary");
  }

});

allBtns.forEach(btn => {
  btn.addEventListener("click", async function() {
    allBtns.forEach(b => {
      b.classList.remove("btn-primary");
      b.classList.add("btn-outline");
    });
    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary");
  });
  

});


const loadAllIssue = async () => {
    showLoading()
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch (url)
    const data = await res.json()
    hideLoading()
    displayIssue(data.data);
    totalIssue.innerText= data.data.length + " Issue"
}

loadAllIssue()

const displayIssue  = (cards) => {
    const cardConatiner = document.getElementById("cardDiv" )
    cardConatiner.innerHTML=""
    cards.forEach(card => {
      let textColor = "" ;
      let img = ""
      if(card.status == "open"){
       textColor = "border-t-4 border-t-green-600" 
      img = "./assets/Open-Status.png"
    } else if(card.status == "closed"){
      textColor = "border-t-4 border-t-[#AB5DF6]"
      img =`./assets/Closed-Status.png`
     
    }
    const cardDiv = document.createElement("div")
    // console.log(card);
    cardDiv.className=`bg-gray-100 p-2 space-y-4 py-4 rounded-sm ${textColor}`
    cardDiv.innerHTML=`
    <div onclick="loadCardDetails(${card.id})"  class="space-y-4">
        <div class="flex justify-between">
         <img src="${img}" class="w-4 h-4" >
         <div class="badge badge-soft badge-warning ">${card.priority}</div>
       </div>
           <h2 class="text-lg font-semibold" >${card.title}</h2>
         <h3 class="text-xs">${card.description}</h3>
         <div>
          <div class="badge badge-soft badge-primary">${card.labels}</div>
         ${card.labels[1] ? ` <div class="badge badge-soft badge-warning">${card.labels[1]}</div>`: ''}
          <hr class="text-gray-300 mt-6">
          <div class="flex flex-row-reverse justify-between items-center">
           <div>
          <p class="text-xs mt-1.5 text-right ">${new Date(card.createdAt).toLocaleDateString("en-US")}</p>
          <p class="text-xs mt-1.5 text-right ">${new Date(card.updatedAt).toLocaleDateString("en-US")}</p>
          </div>
           <div>
           <p class="text-xs mt-2 ">#1 ${card.author}</p>
          <p class="text-xs mt-2">#1 ${card.assignee}</p></div>
         </div>
         </div>
     </div>
    `
    cardConatiner.appendChild(cardDiv)
   
    })
   
}

const loadCardDetails = async (id) => {
  showLoading()
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url)
  hideLoading()
  const data = await res.json();
  displayCardDetails(data.data);
}


const displayCardDetails = (items) => {
  //  console.log(items);
    const detailsBox = document.getElementById("details-container")
    // console.log(detailsBox);
    detailsBox.innerHTML=`
    <h3 class="text-lg font-bold">${items.title}</h3>
    <div class="flex gap-2">
       <div class="badge badge-success">${items.status}</div>
        <p>Owned by ${items.author}</p>
        <p class="text-xs mt-1.5 text-right ">${new Date(items.createdAt).toLocaleDateString("en-US")}</p>
    </div>
    <div>
        <div class="badge badge-soft badge-primary">${items.labels}</div>
      ${items.labels[1] ? ` <div class="badge badge-soft badge-warning">${items.labels[1]}</div>`: ''}
    </div>
    <p>${items.description}</p>
     <div class="bg-gray-100 shadow-xl p-4 flex justify-between rounded-lg">
           <div>
            <p>Assigne</p>
            <p>${items.assignee}</p>
           </div>
           <div>
            <p>Priority</p>
            <div class="badge text-white bg-red-600 ">${items.priority}</div>
           </div> 
        </div>  
    `
   document.getElementById("my_modal_5").showModal()
}

const loadTabissue = async (id) => {
  showLoading()
const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
  const res = await fetch(url)
  hideLoading()
  const fulrespons = await res.json();
  // console.log(fulrespons.data);
 
  if(id == "all"){
    displayTabIssue(fulrespons.data)
     totalIssue.innerText= fulrespons.data.length + " Issue"
    //  displayCardDetails()
  }
  else{
    const filterd = fulrespons.data.filter((item) => item.status == id)
    displayTabIssue(filterd)
    totalIssue.innerText= filterd.length + " Issue"
  }
  
}


const  displayTabIssue = async (words) => {
  displayIssue(words)
}

document.getElementById("search-btn").addEventListener('click',() => {
  const input = document.getElementById("input-field")
  const inputValu = input.value.trim().toLowerCase()
  // console.log(inputValu);
  fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValu}`)
 
  .then (res => res.json())
  .then (data => {
    const allData = data
    // console.log(allData);
   displayIssue(allData.data)
  //  loadTabissue()
  totalIssue.innerText = allData.data.length + " Issue"
  })
})

