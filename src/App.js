import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [step, setStep] = useState(1);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// const isAdmin = searchParams.get('admin');
	const search = window.location.search;

	useEffect(() => {
		axios
			.get('https://wp.easypress.lillo.co.kr/wp-json/ep/v1/rullets')
			.then((response) => {
				console.log(response.data);
				setData(response.data.body.items);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []); // Empty dependency array means this effect runs once when the component mounts

	// const data = [
	// 	{
	// 		ID: 1,
	// 		soldOut: false,
	// 		name: '듀얼 보조배터리',
	// 		p: 14 / 136,
	// 		accumulate: 0,
	// 		img: '/item-01.png',
	// 	},
	// 	{
	// 		ID: 2,
	// 		soldOut: false,
	// 		name: '한번 더',
	// 		p: 20 / 136,
	// 		accumulate: 14 / 136,
	// 		img: '/item-02.png',
	// 	},
	// 	{
	// 		ID: 3,
	// 		soldOut: true,
	// 		name: '친환경 칫촐치약 에코파우치',
	// 		p: 54 / 136,
	// 		accumulate: 34 / 136,
	// 		img: '/item-03.png',
	// 	},
	// 	{
	// 		ID: 4,
	// 		soldOut: false,
	// 		name: '랍포유 할인쿠폰',
	// 		p: 30 / 136,
	// 		accumulate: 88 / 136,
	// 		img: '/item-04.png',
	// 	},
	// 	{
	// 		ID: 5,
	// 		soldOut: false,
	// 		name: '친환경 텀블러',
	// 		p: 2 / 136,
	// 		accumulate: 118 / 136,
	// 		img: '/item-05.png',
	// 	},
	// 	{
	// 		ID: 6,
	// 		soldOut: false,
	// 		name: 'AHC 네추럴 퍼펙션 썬스틱',
	// 		p: 16 / 136,
	// 		accumulate: 120 / 136,
	// 		img: '/item-06.png',
	// 	},
	// ];

	// const items = [
	// 	{ ID: 1, name: '듀얼 보조배터리', p: 14 / 136, img: '/item-01.png' },
	// 	{ ID: 2, name: '한번 더', p: 20 / 136, img: '/item-02.png' },
	// 	{
	// 		ID: 3,
	// 		name: '친환경 칫촐치약 에코파우치',
	// 		p: 54 / 136,
	// 		img: '/item-03.png',
	// 	},
	// 	{ ID: 4, name: '랍포유 할인쿠폰', p: 30 / 136, img: '/item-04.png' },
	// 	{ ID: 5, name: '친환경 텀블러', p: 2 / 136, img: '/item-05.png' },
	// 	{
	// 		ID: 6,
	// 		name: 'AHC 네추럴 퍼펙션 썬스틱',
	// 		p: 16 / 136,
	// 		img: '/item-06.png',
	// 	},
	// ];
	const items = data;

	const [isTry, setIsTry] = useState(false);
	const [deg, setDeg] = useState(0);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isSpinning, setIsSpinning] = useState(false);

	const DoStart = () => {
		if (localStorage.getItem('is_join')) {
			setStep(4);
		} else {
			setStep(2);
		}
	};

	const [array, setArray] = useState([0, 0, 0, 0, 0, 0]);
	const [test, setTest] = useState(0);

	const spinRoulette = () => {
		setIsSpinning(true);
		setIsTry(true);

		let random = (Math.random() * 1000).toFixed(3) / 1000;

		let randomIndex = -1;

		let n = 0;
		let isSoldOut = false;

		while (n < 10000) {
			n++;

			random = (Math.random() * 1000).toFixed(3) / 1000;
			console.log('찐 random', random);

			randomIndex = -1;

			let sum = 0;

			items.map((i, k) => {
				if (random >= sum) {
					console.log('i', i);
					// if (i.soldOut) {
					// 	console.log('randomIndex : ', k);
					// 	console.log('sold out');
					// 	// alert(123);
					// 	isSoldOut = true;
					// } else {
					// 	isSoldOut = false;
					// }

					randomIndex = k;
				}
				sum = sum + i.p;
			});

			if (items[randomIndex]['soldOut']) {
				continue;
			}

			console.log('random', random);

			if (isTry && randomIndex == 1) {
				randomIndex = -1;
				continue;
			}

			if (randomIndex >= 0) {
				break;
			}
		}
		// randomIndex = 3;

		// items.map((i, k) => {
		// 	let sum = sum + i.p;
		// 	if (sum >= random) {
		// 		randomIndex = k;
		// 	}
		// });
		console.log('random', random);

		const defaultRotate = 5;
		let randomDeg =
			randomIndex * 60 + Math.floor(Math.random() * 60) + 360 * defaultRotate;

		setSelectedItem(items[randomIndex]);

		if (deg) {
			let remain = deg - Math.floor(deg / 360) * 360;
			console.log('deg', deg);
			console.log('deg + randomDeg - remain', deg + randomDeg - remain);
			setDeg(deg + randomDeg - remain);
		} else {
			setDeg(randomDeg);
		}

		console.log('randomIndex', randomIndex);
		console.log('randomDeg', randomDeg);

		// 룰렛 회전 애니메이션 (3초 후 결과 표시)
		setTimeout(() => {
			// Math.floor(Math.random() * 361);

			// 한번더
			if (randomIndex != 1) {
				//
				axios
					.post('https://wp.easypress.lillo.co.kr/wp-json/ep/v1/rullets', {
						Index: randomIndex,
					})
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					});

				setTimeout(() => {
					setStep(3);
					setIsSpinning(false);
					localStorage.setItem('is_join', 1);
				}, 300);
			} else {
				setTimeout(() => {
					setStep(5);
					setIsSpinning(false);
					// localStorage.setItem('is_join', 1);
				}, 300);
			}
		}, 3500); // 3초 동안 회전

		const newResults = array;
		newResults[randomIndex] += 1;
		setArray(newResults);
		setTest((p) => p + 1);
	};

	// useEffect(() => {
	// 	if (test < 100000) {
	// 		spinRoulette();
	// 	}
	// 	if (test == 100000) {
	// 		console.log('array', array);
	// 		console.log('array[0]', array[0] / 100000);
	// 		console.log('array[1]', array[1] / 100000);
	// 		console.log('array[2]', array[2] / 100000);
	// 		console.log('array[3]', array[3] / 100000);
	// 		console.log('array[4]', array[4] / 100000);
	// 		console.log('array[5]', array[5] / 100000);
	// 	}
	// }, [test]);

	return (
		<div className="App">
			{step == 1 ? (
				<div className="step-01">
					{search == '?admin=lapp' ? (
						<button onClick={() => localStorage.clear()} className="test-btn">
							리셋 버튼
						</button>
					) : null}
					<img className="img-01" src="/Roulette-01.png" />
					<div className="btn" onClick={DoStart} />
				</div>
			) : null}
			{step == 2 ? (
				<div className="step-02">
					<img className="img-02" src="/Roulette-02.png" />
					<img
						className={isSpinning ? 'rullet isSpinning' : 'rullet'}
						style={
							isTry
								? { transform: `translate(-50%, 0%) rotate(${deg}deg)` }
								: null
						}
						src="/rullet.png"
					/>
					<img src="/hand.png" className="i-01" />
					<img
						src="/center.png"
						className={isSpinning ? 'i-02 isSpinning' : 'i-02'}
						style={
							isTry
								? { transform: `translate(-50%, 0%) rotate(${deg}deg)` }
								: null
						}
					/>
					<div className="shadow" />
					{/* {isSpinning ? 'isSpinning' : 'no isSpinning'}
					{selectedItem ? selectedItem : 'no selectedItem'} */}
					<div
						className="btn"
						onClick={() => {
							isSpinning ? console.log('is spinning') : spinRoulette();
						}}
					/>
				</div>
			) : null}
			{step == 3 ? (
				<div className="step-03">
					{selectedItem?.ID == 4 ? (
						<img className="img-03" src="/Roulette-03.png" />
					) : (
						<img className="img-03" src="/Roulette-03.png" />
					)}
					<img
						className={`d-${selectedItem?.ID} product`}
						src={selectedItem?.img}
					/>
					<div className="text">
						<strong>{selectedItem?.name}</strong>에 당첨되셨습니다!
						<br />
						랍코리아 <strong>네이버 스토어 찜</strong>을 누르고 선물을 받으세요.
					</div>
					<div
						className="btn"
						onClick={() =>
							(window.location.href =
								'https://m.smartstore.naver.com/lappkorea?NaPm=ct%3Dlwsujw6q%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3D971989eda5c632da8ebc4fffee4ff792d06a5b16')
						}
					/>
				</div>
			) : null}
			{step == 4 ? (
				<div className="step-01">
					<img
						className="img-01"
						src="/Roulette-04.png"
						onClick={() => setStep(1)}
					/>
				</div>
			) : null}
			{step == 5 ? (
				<div className="step-03">
					<img className="img-03" src="/Roulette-05.png" />
					{/* <img className="product" src={selectedItem?.img} /> */}
					<div className="text">
						{/* <strong>{selectedItem?.name}</strong>에 당첨되셨습니다!
						<br />
						랍코리아 <strong>네이버 스토어 찜</strong>을 누르고 선물을 받으세요. */}
					</div>
					<div className="btn" onClick={() => setStep(2)} />
				</div>
			) : null}

			<div className="hidden">
				<img className="pre" src="/Roulette-02.png" />
				<img className="pre" src="/Roulette-03.png" />
				<img className="pre" src="/Roulette-04.png" />
				<img className="pre" src="/Roulette-05.png" />
				<img className="pre" src="/item-01.png" />
				<img className="pre" src="/item-02.png" />
				<img className="pre" src="/item-03.png" />
				<img className="pre" src="/item-04.png" />
				<img className="pre" src="/item-05.png" />
				<img className="pre" src="/item-06.png" />
				<img className="pre" src="/hand.png" />
				<img className="pre" src="/center.png" />
			</div>
		</div>
	);
}

export default App;
