$(document).ready(function() {
  let ante = 1;
  let prox = 1;
  let aux = 0;

  let reloadPage = 0;
  let toggleDirection = false;
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  $('#startCalc').click(function() {
    if(reloadPage == 0) {
      $('#startCalc').prop('value', 'RECARREGAR');
      let delimiterNumber = $('#pickValue').val();

      startTableGen(delimiterNumber);

      $('#pickValue').prop('disabled', true);
      $('#pickValue').prop('placeholder', 'Recarregue a Página!');
      $('#pickValue').val('');

      function startTableGen(delimiterNumber) {
        let body = document.getElementById('body');
        let table = document.createElement('table');
        let line = document.createElement('tr');
        let column1 = document.createElement('th');
        column1.className = 'topLeft';
        column1.textContent = 'AUX';
        let column2 = document.createElement('th');
        column2.textContent = 'ANTE';
        let column3 = document.createElement('th');
        column3.className = 'topRight';
        column3.textContent = 'PROX';
    
        line.appendChild(column1);
        line.appendChild(column2);
        line.appendChild(column3);
        table.appendChild(line);

        tableDynamicContent(delimiterNumber);

        async function tableDynamicContent(delimiterNumber) {
          for(let i = 0; i < delimiterNumber; i++) {
            let line2 = document.createElement('tr');

            if(toggleDirection == false) {
              line2.className = "animationLeftToRight";
            }else {
              line2.className = "animationRightToLeft";
            }

            let column4 = document.createElement('th');
            column4.textContent = `${aux}`;
            let column5 = document.createElement('th');
            column5.textContent = `${ante}`;
            let column6 = document.createElement('th');
            column6.textContent = `${prox}`;
      
            line2.appendChild(column4);
            line2.appendChild(column5);
            line2.appendChild(column6);
            
            table.appendChild(line2);
            
            await sleep(400);
      
            aux = ante;
            ante = prox;
            prox += aux;

            if(toggleDirection == false) {
              line2.classList.remove('animationLeftToRight');
              toggleDirection = true;
            }else {
              line2.classList.remove('animationRightToLeft');
              toggleDirection = false;
            }
            
            body.appendChild(table);

            window.scrollTo(0, document.body.scrollHeight);
          }
          let line3 = document.createElement('tr');
          let column7 = document.createElement('th');
          column7.className = "bottomLeft";
          let column8 = document.createElement('th');
          let innerColumn8 = document.createElement('p');
          innerColumn8.className = "copy";
          innerColumn8.innerHTML = "&copy; C. Lohran";
          let column9 = document.createElement('th');
          column9.className = "bottomRight";
      
          column8.appendChild(innerColumn8);
          line3.appendChild(column7);
          line3.appendChild(column8);
          line3.appendChild(column9);
      
          table.appendChild(line3);
        }
        body.appendChild(table);
      }
      reloadPage = 1;
    }else {
      location.reload();
    }
  });
});