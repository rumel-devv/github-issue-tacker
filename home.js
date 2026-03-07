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
    const cardDiv = document.createElement("div")
    // console.log(card);
    cardDiv.className="bg-gray-100 p-2 space-y-4 py-4 rounded-sm"
    cardDiv.innerHTML=`
    <div class="space-y-4">
        <div class="flex justify-between">
         <img src="./assets/Open-Status.png" >
         <div class="badge badge-md">${card.priority}</div>
       </div>
           <h2 class="text-lg font-semibold" >${card.title}</h2>
         <h3 class="text-xs">${card.description}</h3>
         <div>
          <div class="badge badge-soft badge-primary">${card.labels}</div>
          <div class="badge badge-soft badge-warning">Help Wanted</div>
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

// const btnClick = async (id) =>{
//  const res = await fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
//  const data =  await res.json()
//   displayIssue(data.data);
// // }
// const btnClick = async (status) => {
//  const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
//  const data = await res.json()

//  if(status === "all"){
//    displayIssue(data.data)
//  }else{
//    const filtered = data.data.filter(issue => issue.status === status)
//    displayIssue(filtered)
//  }
// if(status == "all"){
//   displayIssue(data.data)
// }
// else if(status === "open"){
//   const filtered = data.data.filter(issue => issue.status === status)
//   displayIssue(filtered)
//   totalIssue.innerText= filtered.length + " Issue"
// }
// }