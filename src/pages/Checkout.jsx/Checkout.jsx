import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Key Stripe
const stripePromise = loadStripe('pk_test_51PL8qABeVHROBfrLGvuTT98OX9yWkEQdvCZmLk4cj9LuaNxB97HvkbnYW5r29F5zUCVe1LrpEGLZhwdR3cRhM2ef00h7pg2ggQ');

const CheckoutForm = () => {
    const { id } = useParams()
    const { discount } = useParams()
    const { tex } = useParams()

    const [isLoading, setIsLoading] = React.useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navegate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const { cart } = useSelector(state => state.cart);
    const [dataPayment, setDataPayment] = React.useState({
        address: '',
        phone: '',
        tex: '',
    });

    // console.log( cart?.cart?.items);

    // Handle Input Events
    const HandleInputChange = (e) => {
        setDataPayment({ ...dataPayment, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`https://food-mern-server.onrender.com/api/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: id,
                    currency: 'USD',
                    name: user?.user?.name,
                    CartName: dataPayment.CartName,
                    email: user?.user?.email,
                    items: cart?.cart?.items,
                    userId: user?.user?._id,
                    address: dataPayment.address,
                    phone: dataPayment.phone,
                    discount: discount,
                    tex: tex,
                    CartID: cart?.cart?._id
                }),
            });

            const data = await response.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                throw new Error('Client secret is missing from the response');
            }

            // Confirm Payment client Secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: dataPayment.CartName,
                    },
                },
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    toast.success('Payment succeeded!');
                    return navegate(`/cart/checkout/payment/success/${result.paymentIntent.id}`)
                }
            }

        } catch (error) {
            console.error('Error during payment:', error.message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
                <div className="bg-[#e6e6e6] p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                        Checkout
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-bold text-gray-800">
                                Choose your payment method
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                <div className="flex items-center">
                                    <label htmlFor="card" className="ml-4 flex gap-2">
                                        <img
                                            src="https://readymadeui.com/images/visa.webp"
                                            className="w-12"
                                            alt="card1"
                                        />
                                        <img
                                            loading='lazy'
                                            src="https://readymadeui.com/images/american-express.webp"
                                            className="w-12"
                                            alt="card2"
                                        />
                                        <img
                                            loading='lazy'
                                            src="https://readymadeui.com/images/master.webp"
                                            className="w-12"
                                            alt="card3"
                                        />
                                    </label>
                                </div>
                            </div>
                            <form onSubmit={handlePayment} className="mt-8">
                                <div className="flex flex-col w-full my-4  space-y-4">
                                    <CardElement options={{
                                        hidePostalCode: true
                                    }} className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                </div>
                                <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            onChange={HandleInputChange}
                                            type="text"
                                            name='CartName'
                                            placeholder="Name of card holder"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='address'
                                            onChange={HandleInputChange}
                                            type="text"
                                            placeholder="Enter Your Address"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={HandleInputChange}
                                            type="text"
                                            placeholder="Enter your City/State"
                                            className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={HandleInputChange}
                                            type="number"
                                            name='phone'
                                            placeholder="Enter your phone number"
                                            className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    {isLoading ? <p
                                        className="px-7 w-full py-2 text-sm tracking-wide bg-yellow text-white rounded-md"
                                    >
                                        <svg loading='lazy' xmlns="http://www.w3.org/2000/svg" className="w-8 animate-spin fill-white  block mx-auto"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                                data-original="#000000" />
                                        </svg>
                                    </p> : <button
                                        type="submit"
                                        className="px-7 w-full py-3.5 text-sm tracking-wide bg-yellow text-white rounded-md"
                                    >
                                        Payment
                                    </button>}
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-md max-lg:-order-1">
                            <h3 className="text-lg font-bold text-gray-800">Summary</h3>
                            <ul className="text-gray-800 mt-6 space-y-3">
                                <li className="flex flex-wrap gap-4 text-sm">
                                    Sub total <span className="ml-auto font-bold">${cart.totalPrice}</span>
                                </li>
                                <li className="flex flex-wrap gap-4 text-sm">
                                    Discount ({discount || 0}%) <span className="ml-auto font-bold">{discount}%</span>
                                </li>
                                <li className="flex flex-wrap gap-4 text-sm">
                                    Tax <span className="ml-auto font-bold">${tex}</span>
                                </li>
                                <hr />
                                <li className="flex flex-wrap gap-4 text-base font-bold">
                                    Total <span className="ml-auto">${id}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const CheckoutPage = () => {
    return (
        <>
            <Header />
            <div className="flex min-h-screen w-full items-center justify-center">
                <div className="w-full ">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default CheckoutPage;
