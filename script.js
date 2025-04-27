function toggleDarkMode() {
    // Cambia el atributo de tema en el body
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  }
  
  function formatearInputMonto() {
    let monto = document.getElementById('monto').value;
    let aporteMensual = document.getElementById('aporteMensual').value;
    let montoPrestamo = document.getElementById('montoPrestamo').value;
  
    document.getElementById('monto').value = formatNumber(monto);
    document.getElementById('aporteMensual').value = formatNumber(aporteMensual);
    document.getElementById('montoPrestamo').value = formatNumber(montoPrestamo);
  }
  
  function formatNumber(number) {
    return number.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function formatearMonto(monto) {
    return monto.toLocaleString('es-CO');
  }
  
  function calcular() {
    let monto = parseFloat(document.getElementById('monto').value.replace(',', ''));
    let aporteMensual = parseFloat(document.getElementById('aporteMensual').value.replace(',', ''));
    let porcentajeAnual = 9.5;
  
    const entidad = document.getElementById('entidad').value;
  
    if (entidad === 'rapipay') {
      porcentajeAnual = 9;
    } else if (entidad === 'nu_flexible') {
      porcentajeAnual = 9.5;
    } else if (entidad === 'nu_cdt_90' || entidad === 'nu_cdt_120') {
      porcentajeAnual = 10;
    } else if (entidad === 'lulobank') {
      porcentajeAnual = 9.5;
    } else if (entidad === 'personalizado') {
      porcentajeAnual = parseFloat(document.getElementById('porcentajePersonalizado').value);
    }
  
    const plazo = parseFloat(document.getElementById('plazoValor').value);
    const tipoPlazo = document.getElementById('plazoTipo').value;
  
    let plazoEnDias = plazo;
  
    if (tipoPlazo === 'meses') {
      plazoEnDias = plazo * 30;
    } else if (tipoPlazo === 'anios') {
      plazoEnDias = plazo * 365;
    }
  
    let interesDiario = Math.pow(1 + (porcentajeAnual / 100), 1 / 365) - 1;
  
    let saldoFinal = monto;
    let totalGanancia = 0;
  
    for (let i = 0; i < plazoEnDias; i++) {
      saldoFinal += saldoFinal * interesDiario + aporteMensual;
      totalGanancia = saldoFinal - monto - aporteMensual * plazoEnDias;
    }
  
    const resultadoTexto = `<p><strong>Total invertido:</strong> ${formatearMonto(monto)}</p>` +
      `<p><strong>Ganancia final:</strong> ${formatearMonto(totalGanancia)}</p>` +
      `<p><strong>Total final:</strong> ${formatearMonto(saldoFinal)}</p>`;
  
    document.getElementById('resultado').innerHTML = resultadoTexto;
  }
  
  function calcularPrestamo() {
    let montoPrestamo = parseFloat(document.getElementById('montoPrestamo').value.replace(',', ''));
    let interesAnualPrestamo = parseFloat(document.getElementById('interesAnualPrestamo').value);
    let plazoPrestamo = parseFloat(document.getElementById('plazoPrestamo').value);
  
    let interesMensual = (interesAnualPrestamo / 100) / 12;
    let pagoMensual = montoPrestamo * interesMensual / (1 - Math.pow(1 + interesMensual, -plazoPrestamo));
  
    let totalPago = pagoMensual * plazoPrestamo;
    let ganancia = totalPago - montoPrestamo;
  
    const resultadoPrestamoTexto = `<p><strong>Pago mensual:</strong> ${formatearMonto(pagoMensual.toFixed(2))}</p>` +
      `<p><strong>Ganancia total:</strong> ${formatearMonto(ganancia.toFixed(2))}</p>` +
      `<p><strong>Total a pagar:</strong> ${formatearMonto(totalPago.toFixed(2))}</p>`;
  
    document.getElementById('resultadoPrestamo').innerHTML = resultadoPrestamoTexto;
  }
  