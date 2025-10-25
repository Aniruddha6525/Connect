import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Toggle.png';

const TermsOfServicePage = () => {
	const lastUpdated = 'October 25, 2025';

	return (
		<div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-md">
				<div className="text-center mb-12">
					<img src={logoImage} alt="Logo" className="h-30 sm:h-30 w-auto" />
					<h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">Terms of Service</h1>
					<p className="mt-2 text-sm text-gray-500">Last Updated: {lastUpdated}</p>
				</div>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>1. Acceptance of Terms</h2>
					<p>
						Welcome to Connect ("the Platform", "we", "us", or "our"). By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, please do not use the Platform. These Terms apply to all users, including visitors, registered members, mentors, and mentees.
					</p>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>2. User Accounts</h2>
					<p>
						To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and keep your account information updated. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
					</p>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>3. Use of the Platform</h2>
					<p>
						Connect provides a platform for students and professionals to find mentors, participate in workshops, and engage with a community. You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:
					</p>
					<ul>
						<li>Violate any applicable laws or regulations.</li>
						<li>Infringe upon the rights of others, including intellectual property rights.</li>
						<li>Post or transmit any content that is harmful, offensive, defamatory, or otherwise objectionable.</li>
						<li>Engage in any activity that disrupts or interferes with the Platform's operation.</li>
						<li>Attempt to gain unauthorized access to any part of the Platform or its systems.</li>
					</ul>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>4. Mentorship Relationship</h2>
					<p>
						The Platform facilitates connections between mentors and mentees. We do not guarantee the quality, suitability, or outcomes of any mentorship relationship established through the Platform. Mentors and mentees interact at their own discretion and risk. Connect is not a party to any agreement or communication between users. We encourage respectful and professional conduct.
					</p>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>5. Disclaimers</h2>
					<p>
						The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or secure.
					</p>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>6. Limitation of Liability</h2>
					<p>
						To the fullest extent permitted by law, Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Platform.
					</p>
				</section>

				<section className="mb-8 prose prose-indigo max-w-none">
					<h2>7. Governing Law</h2>
					<p>
						These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
					</p>
				</section>

				<section className="prose prose-indigo max-w-none">
					<h2>8. Contact Us</h2>
					<p>
						If you have any questions about these Terms, please contact us at <a href="mailto:ghatageaniruddha@gmail.com">ghatageaniruddha@gmail.com</a>.
					</p>
				</section>

				<div className="mt-12 text-center">
					<Link to="/" className="text-orange-600 hover:text-orange-500 font-medium">&larr; Back to Home</Link>
				</div>
			</div>
		</div>
	);
};

export default TermsOfServicePage;
