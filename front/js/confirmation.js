//-----page confirmation
//récuperation URL et ID commande
const urlConfirmation = new URL(window.location.href);

// récuperation numéro de commande
const addOrderId = () => {  
    const params = urlConfirmation.searchParams;
    const orderConfirmation =params.get('name');
    document.getElementById('orderId').innerHTML = orderConfirmation;
};
addOrderId();