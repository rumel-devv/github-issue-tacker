const totalIssue = document.getElementById("total-issue")
const allBtns = document.querySelectorAll("#btnsDiv button");

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
  btn.addEventListener("click", function() {
    allBtns.forEach(b => {
      b.classList.remove("btn-primary");
      b.classList.add("btn-outline");
    });
    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary");
  });
 

});


const loadAllIssue = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch (url)
    const data = await res.json()
    displayIssue(data.data);
    totalIssue.innerText= data.data.length + " Issue"
}

loadAllIssue()

const displayIssue  = (cards) => {
    const cardConatiner = document.getElementById("cardDiv" )
    cardConatiner.innerHTML=""
    cards.forEach(card => {
    const cardDiv = document.createElement("div")
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
          <p class="text-xs mt-2">#1 ${card.author}</p>
          <p class="text-xs mt-1.5">${card.createdAt}</p>
          <p class="text-xs mt-1.5">${card.updatedAt}</p>
         </div>
     </div>
    `
    cardConatiner.appendChild(cardDiv)
    })
    
}

allBtns.forEach(btn => {
    btn.addEventListener('click',async function() {
        const id = this.dataset.id;
        // console.log(id);
       const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
      const data = await res.json()
      console.log(data.data);
    })
})