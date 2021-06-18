// アプリケーション設定を記述
// browserifyでビルドした後でも変更可能なように、純粋なjsファイルとして記述
// window直下のグローバルオブジェクトとして AppConf を定義し、その下に設定を記述する。
// 雛形アプリ上では、実行時にwindow.AppConfが定義されているかどうかをチェックすること。
window.AppConf = {};

AppConf.core = {
	contentsVersion: "",                        // アプリ毎のコンテンツバージョンを設定します（リリース時のSVNリビジョン）
	// applicationId: "hqw6n8rclbax8457",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "hqw6n8rclbax8457",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	// applicationId: "ucxpkhxmygdjtqhh",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "ucxpkhxmygdjtqhh",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	applicationId: "jw2Mim8s4iB9FicA",          // ApplicationId jrwxejxpy4c1yelo
	localStorageKey: "jw2Mim8s4iB9FicA",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	debug: false,                               //
	defaultPerPage: 100,                         // NOTE: under development
	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
};

// sms、valuecard用
//AppConf.core = {
//	applicationId: "QufVSOh5uCazJWqf",          // ApplicationId jrwxejxpy4c1yelo
//	localStorageKey: "QufVSOh5uCazJWqf",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
//	debug: false,                               //
//	defaultPerPage: 100,                         // NOTE: under development
//	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
//};

AppConf.url = {
	// appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
	appRoot: 'https://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
//	appRoot: 'http://dev.bemss.jp/btapi',            // APIのルートURL for local
	registerUser: 'http://bemss.jp/tigerdemo1/cont109.php',    // 会員登録URL
	modifyUserInfo: 'http://google.co.jp',        // 会員情報変更URL
	term: 'http://google.co.jp',                  // 利用規約URL
	privacyPolicy: 'http://google.co.jp',         // プライバシーポリシーURL
	forgetPassword: 'https://bemss.jp/tigerdemo1/mpc_forgot.php',        // パスワードを忘れた方はコチラのURL
	registerForm: 'https://mdh.fm/e?kZ1032HKFL&blmid=%34%39%37%38',    // 空メールからの戻りが一つの場合、通常はこちらを使う
	registerFormCard: 'https://mdh.fm/e?kXXXXXXXX&smstid=xxx',    // sms認証の場合のみで使用、カード番号あり用のフォーム
	registerForms : {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=%34%39%37%38",
		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&smstid=xxxx",
	},
	modifySmsUserInfo: 'https://mdh.fm/e?kXXXXXXXX',        // SMS会員情報変更URL
	smsRegisterForm: 'http://bemss.jp/tigerdemo1/inc_app_redir.php?type=form&ftype=kXXXXXXXX',  // SMS会員情報登録URL
};

// sms、valuecard用
//AppConf.url = {
//	appRoot: 'http://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
////	appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
//	registerUser: 'http://google.co.jp',    // 会員登録URL
//	modifyUserInfo: 'https://bt01.betrend.com/e?kN102UDXbnj',        // 会員情報変更URL
//	term: 'http://google.co.jp',                  // 利用規約URL
//	privacyPolicy: 'http://google.co.jp',         // プライバシーポリシーURL
//	forgetPassword: 'http://google.co.jp',        // パスワードを忘れた方はコチラのURL
//	registerForm: 'https://bt01.betrend.com/e?kN102UDXbox&smstid=2993',    // 空メールからの戻りが一つの場合、通常はこちらを使う
//	registerFormCard: 'https://bt01.betrend.com/e?kN102UDXbni&smstid=2993',    // sms認証の場合のみで使用、カード番号あり用のフォーム
//	registerForms : {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//	},
//	modifySmsUserInfo: 'https://bt01.betrend.com/e?kN102UDXcZv',        // SMS会員情報変更URL
//	smsRegisterForm: 'https://bt01.betrend.com/e?kN102UDXbov&smstid=2993',  // SMS会員情報登録URL
//};

AppConf.text = {
	shopName: "Porto",
};

/**
 * レイアウト関連の設定
 */
AppConf.layout = {
	navColumns: 3, // トップページのレイアウト 2カラムか3カラムか
	stamp: {
		type: "", // hitap、指定がない場合は既存の位置情報
		style: "stamp", // raiten=1回ごとの報酬、stamp=既存のスタンプ画面
		initialStampCount: 5, // スタンプのカウント
		initialGetImageUrl: "./image/stamp/icon_stamp_g.png",
		touchPointLength: 5
	},
	coupon: {
		type: "", // hitap、QRクーポンの場合のみ指定可能。
		touchPointLength: 5, // type=hitapの場合のタッチ数
	},
	passticket: {
		type: "", // hitap、infosound、指定がない場合はhitap
		touchPointLength: 5, // type=hitapの場合のタッチ数
	},
};

/**
 * 各種機能のON/OFF
 * NOTE: 現状はUIには反映されない（機能の読み込みのみ抑制:ボタン押しても動かない）
 * sms:sms認証
 * smart:valuecard
 */
AppConf.features = {
	config: true,
	coupon: true,
	stamp: true,
	shop: true,
	point: true,
	information: true,
	history: true,
	chirashi: true,
	scratch: false,
	autologin: true,
	slideshow: false,
	sms: false,
	smart: false,
	autoregist: false,
	member: true,
	register: true,
	backlight: false,
	tracking: true,
	changeMenu: false,
	stop: false,
	tileBanner: false,
	passTicket: false,
	ticket: false, //todo feature have not yet
	wallet: false,
	infoSound: false,
};

/**
 * valuecardの履歴に表示する取引種別コード
 */
AppConf.valuecard = {
	reqClassValues: {
		"4001": "残高照会",
		"4002": "入金",
		"4003": "利用",
		"4004": "返品",
		"4005": "入金取消",
		"4006": "利用取消",
		"4007": "要求取消",
		"4008": "清算",
		"4012": "クーポン入金",
		"4015": "クーポン取消",
		"4022": "ポイント加算",
		"4023": "ポイント利用",
		"4025": "ポイント加算取消",
		"4026": "ポイント利用取消",
		"4801": "入金(web)",
		"4802": "クーポン入金(web)",
		"4803": "利用(web)",
		"4804": "返品(web)",
		"4805": "入金取消(web)",
		"4806": "利用取消(web)",
		"4807": "失効",
		"4808": "復活(web)",
		"4809": "ボーナス入金(web)",
		"4811": "残高照会(PC)",
		"4812": "残高照会(携帯)",
		"4899": "アクティベート",
		"9801": "無効(web)",
		"9803": "バリュー移動",
		"9804": "バリュー移動",
		"9805": "有効期限変更",
		"9806": "合算（合算元）",
		"9807": "合算（合算先）",
	},
};

/**
 * DEMO用の設定
 */
AppConf.demo = {
	// チラシ機能の設定
	chirashi: {
		viewer: "http://bt11.betrend.com/chirashi/index.php",

		chirashi1: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_1.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_1.jpg",
			title: "チラシサンプル 7/14〜7/17 1",
		},
		chirashi2: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_2.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_2.jpg",
			title: "チラシサンプル 7/14〜7/17 2",
		},
	},
};

/**
クーポン一覧の設定
**/
AppConf.couponList = {
	// 利用不可クーポンも含め全て表示する
	redisplayTime: 1800,  // second 現状、再表示方法が分単位なので60で割り切れる数字を設定する
    showUsed: true, // 利用制限ありクーポン利用後に、redisplayTime経過後もクーポン一覧に表示するかのフラグ（falseは表示されない）
};

//クーポン一覧、お知らせ一覧の表示形式  
//v1:リスト形式、v1以外：サムネイル形式
AppConf.UI = {
    version: "v1",
    coupon: {
		version: "v1",
        detail: {
            version: "v1"
        }
	},
	information: {
        detail: {
            version: "v1"
        }
	},
	dialog: {
		confirm: {
			version: 'v1'
		},
		alert: {
			version: 'v1'
		}
	}
}

AppConf.slideshow = {
	autoplaySpeed: 2000,
	speed: 2000,
	slideshowContentsList: [
		{
			linkUrl: "",
			webviewFlag: "0",
			imageUrl: "./image/top/img_logo_bg.png"
		}
	]
};

AppConf.member = {
	showData: true
};

/**
 * 表示メッセージ設定
 **/
AppConf.message = {
	information: "お知らせ",
	contentsVersionUp: "コンテンツが更新されています。\n再度アプリを起動しコンテンツを更新してください。\n＊はいを押すとアプリを終了します。",
	registrationIdUpdateFailure: "通信に失敗しました。\n通信状況をご確認ください。",
	trackingidUpdateFailure: "初期化処理に失敗しました。\n通信状況をご確認ください。",
	yes: "はい",
	maintenance: "大変申し訳ありません。只今、メンテナンス中です。しばらくたってから、ご利用ください。",
};

/**
 * レスポンスデータをキャッシュする期限設定
 **/
AppConf.expire = {
	user: {
		detail: 60,
		point: 60,
		value: {
			detail: 60,
		},
	},
	notification: {
		insert: 300,
	},
	information: {
		list: 300,
		detail: 300,
		pop: 300,
		read: 300,
	},
	tileBanner: {
		list: 60,
	},
	coupon:{
		list: 60,
	}
};

AppConf.scratchImg = {
	url : "http://img.bemss.jp/static/img/scratch/app/",
}

AppConf.scratch = {
	/**
	 * type
	 * 0: scratchId
	 * 1: custId
	 * 2: shopId
	 */
	type: 1,
	scratchId: "",
	custId: "Z103BA",
	retryFlg: false,
	bg: AppConf.scratchImg.url + AppConf.core.applicationId + "/img1.png",
	fg: AppConf.scratchImg.url + AppConf.core.applicationId + "/img0.png",
	size : 20,
	scratchErrMsg: {
		"0001": "エラーが発生しました。<br>ページを再読み込みして下さい。", // 不正なスクラッチID
		"0002": "スクラッチ実施期間前です。", // 有効期間前
		"0003": "スクラッチ実施期間は終了しました。", // 有効期限切れ
		"0004": "既に利用されています。", // 全ユーザでのトータル回数上限オーバー
		"0005": "既に利用されています。", // 1ユーザでのトータル回数制限オーバー
		"0006": "本日は既に利用されています。", // 1日あたりの全ユーザの回数制限オーバー
		"0007": "本日は既に利用されています。", // 1日あたりの1ユーザの回数制限オーバー
		"0008": "現在実行できない時間帯です。", // 時間帯制限前
		"0009": "現在実行できない時間帯です。", // 時間帯制限後
		"0010": "エラーが発生しました。<br>しばらく経って再度実行して下さい。", // 連続利用制限エラー
		"0011": "実行できません。", // 利用可能店舗エラー
		"0012": "エラーが発生しました。<br>ページを再読み込みして下さい。", // 当選最大数エラー（当選数の最大値に達している為にはずれ）
		"0013": "スクラッチ実施期間外です。", // 有効期間外
	},
	showGuide : false,
};

AppConf.sms = {
	message: "株式会社xxxxx\n下記のURLより会員登録を行って下さい。$${URL}\n",
};

AppConf.bright = {
	min: 70,
	max: 100,
	exclude: {
		"deviceNames": [""],
		"patterns": [""],
	},
};

// trackingログイン設定。AppConf.features.tracking=trueの場合のみ有効
AppConf.tracking = {
	timing: 3000,
	uuidonly: true, // UUIDのみでの自動ログインの場合true
	showAutoregist: false, // 使い方画像を表示する場合false
};

AppConf.menus = {
	footer: "footer",
	tile: "tile",
}

AppConf.menu = {
	style: AppConf.menus.footer,
	footer: {
		hideFooter: {
			// 機能ごとの設定なので編集不要
			scratch: true,
			'pass-ticket-detail': true,
			'payment-pass-ticket': true
		},
	},
	tile: {
	},
};
AppConf.userRankColumn = '会員ランク';
AppConf.passTicket = {
	ccid: 'A100000000000001069951cc',
	secretKey: 'ca7174bea6c9a07102fa990cfba330d0dad579a7c13a974fa7c3ec0ff66c1d6f',
	tokenApiKey: 'cd76ca65-7f54-4dec-8ba3-11c12e36a548',
	bannerImage: './image/top/wide_bnr.png',
	countDownTime: 30, //in minutes
}

AppConf.stampErrMsg = {
	'1002': 'リクエストパラメータエラー',
	'1003': 'リクエストタイムアウト',
	'1004': 'リクエストエラー',
	'2001': 'デバイス認識失敗',
	'2002': 'デバイス認識失敗',
	'2003': '連続デバイス認識失敗'
};

AppConf.wallet = {
	use: {
        type: "" // set type is "stamp" or "infosound" and if don't set, default will be "member"
    }
};

/**
 * infosoundの音響IDと既存のinfosoundIDの紐付け
 */
AppConf.infosounds = {
	'timeout': 1 * 1000, // InfoSoundタイムアウト設定
	// サンプル
	'app_id': 'aacbf526fccc2dfec1413d533138652ba7e034453c28e5e1868321d1a7a3124d2feac3ee86585d09471ae52eec6165f9400ad6da553e97667faaf1a2d7655bb1',//おもてなしガイドappid
	'app_secret': '0bb41f7e3ba0d10f4771b3154e675ae5346c248f2ca8db0644b17454cb0ffd6aeee52fe190f08fee842d110e7779b3659da653953357235d02af6b13f912d20f',//おもてなしガイドsecretid
	// 実施店舗緯度経度情報
	"locations" : {
		'30000': {longitude: 139.72306375,latitude: 35.62387046},
		'70579': {longitude: 139.72306375,latitude: 35.62387046},
		'70578': {longitude: 139.70994969,latitude: 35.73271908},
		'70577': {longitude: 139.70735339,latitude: 35.64606209},
		'70576': {longitude: 139.74647752,latitude: 35.64784605},
	},
	// infosound音響ID
	"oid" : {
		'024C0000': '30000-C13A3902896D',
		'024A0000': '30000-B001173T',
	},

};

// Timeout and offline member
AppConf.timeout = {
	page: 15000, // set timeout for all page
	member: 5000, // set timeout for member page
};

AppConf.register = {
	webview: false, // true:従来のwebviewでの携帯サイト表示、false:下記空メール情報を利用してコンテンツ側の画面表示
	"mail1" : {
		registerMail: '',    // 空メールメールアドレス
		registerDomain: '',    // 表示用空メールドメイン
		blankmailId: '',    // 空メールID
	},
	"mail2" : {
		registerMail: '',
		registerDomain: '',
		blankmailId: '',
	},
	"mail3" : {
		registerMail: '',
		registerDomain: '',
		blankmailId: '',
	},
};
// Url Modifier
AppConf.urlModifier = {
	targets: [
		'.sliderImages a[href]', 
		'.tile-banner-container a[href]', 
		'#INFORMATION-DETAIL a[href]', 
		'#SHOP-DETAIL a[href]', 
		'#COUPON-DETAIL a[href]',
		'.menuContainer a[href]',
	],
};

// AppConf.liff = {
// 	id: '1655970647-MNmneNVx'
// }

AppConf.liff = {
	id: '1656109781-2xl7Qvry'
}

AppConf.qrcode = {
	url: 'https://thaignt.github.io/line-app-qrcode/web/qrcode.html'
}