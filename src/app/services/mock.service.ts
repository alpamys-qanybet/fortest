import { Injectable } from '@angular/core';

@Injectable()
export class MockService {
	products = [];
	perProductPage = 15;

	constructor() {
		let products = [{
			id: 8,
			name: "Митсубиси Аиртрек 2003",
			slug: "mitsubisi-airtrek-2003",
			cost: null,
			min_cost: "340000.00",
			max_cost: "400000.00",
			description: "Машина в отличном состояние. ",
			photo: "/file/image?idExt=26.jpg&baseFolder=file_product&format=original",
			is_auction: 1,
			status: "Опубликован",
			end_time: "2017-09-13 17:30:00",
			city_id: 1761,
			readableCity: "Москва",
			phone: "+79254552773"
		},
		{
			id: 7,
			name: "Ниссан максима QX 2003",
			slug: "nissan-maksima-qx-2003",
			cost: null,
			min_cost: "160000.00",
			max_cost: "190000.00",
			description: "Авто 2003 года в хорошем состоянии, требует косметики. (Бампер, капот) Обьем 2,5 л, максимальная комплектация, кожа, люк, подогрев, абс, климат,. Все работает, не открывается задняя дверь, заклинило после блокировки от детей. Торг уместен. Обмен рассмотрю варианты.",
			photo: "/file/image?idExt=22.jpg&baseFolder=file_product&format=original",
			is_auction: 1,
			status: "Опубликован",
			end_time: "2017-09-03 21:30:00",
			city_id: 199,
			readableCity: "Балашиха",
			phone: "+79265725560"
		},
		{
			id: 6,
			name: " Новый квадроцикл",
			slug: "novyj-kvadrocikl",
			cost: null,
			min_cost: "7000.00",
			max_cost: "11000.00",
			description: "Новый детский электро квадроцикл",
			photo: "/file/image?idExt=18.jpg&baseFolder=file_product&format=original",
			is_auction: 1,
			status: "Опубликован",
			end_time: "2017-08-31 22:25:00",
			city_id: 199,
			readableCity: "Балашиха",
			phone: "+79254552773"
		},
		{
			id: 5,
			name: "MacBook Pro 17'' 2011 A1297",
			slug: "macbook-pro-17-2011-a1297",
			cost: null,
			min_cost: "27000.00",
			max_cost: "35000.00",
			description: "MacBook Pro 17'' later 2011 A1297 Хорошее состояние Требуется перекатать чип дискретной видеокарты, от перегрева отошли контакты",
			photo: "/file/image?idExt=17.jpg&baseFolder=file_product&format=original",
			is_auction: 1,
			status: "Опубликован",
			end_time: "2017-08-29 02:50:00",
			city_id: 1761,
			readableCity: "Москва",
			phone: "+79254552773"
		},
		{
			id: 4,
			name: "iPhone 6S 128gb",
			slug: "iphone-6s-128gb",
			cost: "26500.00",
			min_cost: null,
			max_cost: null,
			description: "Срочно продам 6s 128gb чёрном корпусе , работоспособность 10из 10 , наушники , зарядка , коробка .причина продажи : подарили семерку )",
			photo: "/file/image?idExt=16.jpg&baseFolder=file_product&format=original",
			is_auction: 0,
			status: "Опубликован",
			end_time: null,
			city_id: 1761,
			readableCity: "Москва",
			phone: "+79254552773"
		},
		{
			id: 3,
			name: "Forward 18 скоростей",
			slug: "forward-18-skorostej",
			cost: null,
			min_cost: "4000.00",
			max_cost: "7000.00",
			description: "",
			photo: "/file/image?idExt=14.jpg&baseFolder=file_product&format=original",
			is_auction: 1,
			status: "Опубликован",
			end_time: "2017-08-30 17:50:00",
			city_id: 199,
			readableCity: "Балашиха",
			phone: "+79254552773"
		}];

		for (var i=0; i<40; i++) {
			this.products = this.products.concat(products);
		}
	}

	fetchProducts(page) {
		let offset = (page-1) * this.perProductPage;
		let limit = this.perProductPage;

		if (offset >= this.products.length) {
			return {
				response: {
					success: true,
					data: []
				},
				info: {	
					currentPage: 1,
					pageCount: 1,
					perPage: 5,
					totalCount: 0
				}
			};
		}

		return {
			response: {
				success: true,
				data: this.products.slice(offset, offset + limit)
			},
			info: {	
				currentPage: page,
				pageCount: this.products.length / this.perProductPage,
				perPage: this.perProductPage,
				totalCount: this.products.length
			}
		};
	}
}