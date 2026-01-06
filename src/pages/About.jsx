import Card from '../components/Card';
import busInterior from '../assets/images/Bus-interior.jpg';
import { Shield, Award, Clock, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-indigo-50 via-white to-pink-50">
      <div className="container px-4 mx-auto">

        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-extrabold text-transparent md:text-6xl bg-clip-text bg-linear-to-r from-indigo-600 to-pink-500">
            About BHS Travels
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 md:text-2xl">
            Your trusted travel partner for comfortable, safe, and reliable bus journeys.
          </p>
        </div>

        {/* Company Story */}
        <Card className="mb-16 overflow-hidden border border-indigo-100 shadow-2xl rounded-3xl bg-white/70 backdrop-blur-md">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-10 md:p-14 bg-linear-to-br from-indigo-50 to-pink-50">
              <h2 className="mb-6 text-4xl font-bold text-gray-800">Our Story</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-600">
                BHS Travels was founded with a simple vision — to provide safe and comfortable travel.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-gray-600">
                Our commitment has always focused on punctuality, safety, and customer satisfaction.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Today, we operate a modern fleet of AC, Non-AC, and Sleeper buses.
              </p>
            </div>
            <div className="h-64 overflow-hidden md:h-auto">
              <img
                src={busInterior}
                alt="Bus Interior"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </Card>

        {/* Mission & Vision */}
        <div className="grid gap-8 mb-20 md:grid-cols-2">
          <Card className="transition-all border border-indigo-100 shadow-xl rounded-3xl bg-white/70 backdrop-blur-md hover:shadow-2xl hover:scale-105">
            <div className="p-10">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-lg bg-linear-to-br from-indigo-600 to-indigo-400">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To deliver safe, comfortable, and affordable bus travel services for every passenger.
              </p>
            </div>
          </Card>

          <Card className="transition-all border border-pink-100 shadow-xl rounded-3xl bg-white/70 backdrop-blur-md hover:shadow-2xl hover:scale-105">
            <div className="p-10">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-lg bg-linear-to-br from-pink-500 to-pink-400">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-800">Our Vision</h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To become the most trusted and preferred bus travel service in Maharashtra.
              </p>
            </div>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 md:text-5xl mb-14">
            Why Choose Us
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: 'Safety First', desc: 'Regular maintenance and strict safety inspections are our top priority.', gradient: 'from-indigo-600 to-indigo-400' },
              { icon: Clock, title: 'On-Time Service', desc: 'Reliable and punctual departures with well-planned schedules.', gradient: 'from-pink-500 to-pink-400' },
              { icon: Award, title: 'Comfort & Quality', desc: 'Modern buses with comfortable seating and a premium travel experience.', gradient: 'from-indigo-500 to-pink-400' },
            ].map((item, idx) => (
              <Card key={idx} className="text-center transition-all shadow-xl rounded-3xl bg-white/70 backdrop-blur-md hover:shadow-2xl hover:scale-105">
                <div className="p-10">
                  <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-lg bg-linear-to-br ${item.gradient}`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className="text-lg text-gray-600">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <Card className="text-black shadow-2xl rounded-4xl bg-linear-to-r">
          <div className="grid grid-cols-2 gap-8 p-12 text-center md:grid-cols-3">
            {[
              { number: '2+', label: 'Years of Experience' },
              { number: '5+', label: 'Buses in Fleet' },
              { number: '10K+', label: 'Satisfied Customers' },
            ].map((stat, idx) => (
              <div key={idx} className="transition-transform hover:scale-110">
                <div className="mb-3 text-5xl font-extrabold md:text-6xl">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
