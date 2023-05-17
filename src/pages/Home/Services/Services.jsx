import { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("https://car-doctor-server-mocha-theta.vercel.app/services")
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);

    return (
        <div>
            <div className='text-center mt-12'>
                <h3 className='text-2xl text-orange-600'>Service</h3>
                <h2 className='text-5xl font-semibold my-5'>Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0'>
                {
                    services.map(service =>
                        <ServicesCard
                            key={service._id}
                            service={service}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Services;