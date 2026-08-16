"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AdSenseUnit } from "./AdSenseUnit";

type Format =
  | "X完全連載型"
  | "独立短編・4コマ型"
  | "完結アーカイブ型"
  | "試し読み・外部誘導型";

type Manga = {
  slug: string;
  title: string;
  author: string;
  handle: string;
  summary: string;
  genre: string;
  format: Format;
  tags: string[];
  accent: string;
  mark: string;
  xPostUrl?: string;
  entryLabel: string;
};

const entry = (
  slug: string,
  title: string,
  author: string,
  handle: string,
  summary: string,
  genre: string,
  format: Format,
  xPostUrl?: string,
  tags: string[] = []
): Manga => ({
  slug,
  title,
  author,
  handle: handle ? `@${handle}` : "公式アカウント確認中",
  format,
  xPostUrl,
  tags,
  entryLabel: "公式ポストを読む",
  summary: summary || "Xで公開された作品ポストから読めるWeb漫画です。",
  genre: genre || "Web漫画",
  accent: ["coral", "blue", "navy", "yellow", "green", "pink"][title.length % 6],
  mark: title.slice(0, 1),
});

const mangaList: Manga[] = [
  entry("chiikawa", "ちいかわ", "ナガノ", "ngnchiikawa", "小さくてかわいいキャラクターたちの日常と冒険を描くX発の継続連載。", "日常・ファンタジー", "X完全連載型", "https://x.com/ngnchiikawa/status/1221617681654108160", ["連載中", "日常", "キャラクター"]),
  entry("nekooji", "ねこに転生したおじさん", "やじま", "yajima_en", "おじさんが猫になってしまった生活を描くSNS発漫画。", "動物・日常", "X完全連載型", "https://x.com/yajima_en/status/1622215266385158144", ["猫", "転生"]),
  entry("kinioto", "気になってる人が男じゃなかった", "新井すみこ", "agu_knzm", "音楽をきっかけに始まる青春恋愛漫画。", "青春・恋愛", "X完全連載型", "https://x.com/agu_knzm/status/1512998788025110532", ["青春", "音楽"]),
  entry("saranami", "今さらですが、幼なじみを好きになってしまいました", "丸戸史明・よむ", "sa_ra_na_mi", "幼なじみ同士の距離感を描く恋愛作品。", "恋愛", "X完全連載型", "https://x.com/sa_ra_na_mi/status/1739058372568338764", ["恋愛"]),
  entry("koguma-cakeshop", "こぐまのケーキ屋さん", "カメントツ", "Computerozi", "こぐまが営むケーキ屋さんの日常漫画。", "日常・ほのぼの", "X完全連載型", "https://x.com/Computerozi/status/928581647653470208", ["動物", "癒やし"]),
  entry("neko-youkai", "ねこようかい", "ぱんだにあ", "pandania0", "猫と妖怪を組み合わせた4コマ漫画。", "動物・妖怪", "X完全連載型", "https://x.com/pandania0/status/617305503471767553", ["猫", "妖怪"]),
  entry("tsushima-cat", "俺、つしま", "おぷうのきょうだい", "tsushimacat", "猫との暮らしを描くコミカルな漫画。", "動物・エッセイ", "X完全連載型", "https://x.com/tsushimacat/status/894503903663857664", ["猫"]),
  entry("tabekuma", "くまのむちゃうま日記", "ナガノ", "ngntrtr", "食べ物をテーマにしたナガノ作品。", "グルメ・日常", "X完全連載型", "https://x.com/ngntrtr/status/1501983079467945989", ["食べ物"]),
  entry("yoruneko", "夜は猫といっしょ", "キュルZ", "kyuryuZ", "猫との生活を描く短編漫画。", "動物・日常", "独立短編・4コマ型", "https://x.com/kyuryuZ/status/990882388535214080", ["猫", "短編"]),
  entry("everyday-debudori", "毎日でぶどり", "橋本ナオキ", "debu_dori", "鳥たちの日常や社会ネタを描く4コマ。", "4コマ・社会風刺", "独立短編・4コマ型", "https://x.com/debu_dori/status/957226427128008704", ["4コマ"]),
  entry("dog-and-cat", "犬と猫どっちも飼ってると毎日たのしい", "松本ひで吉", "hidekiccan", "犬猫それぞれの性格を描くペット漫画。", "動物・エッセイ", "独立短編・4コマ型", "https://x.com/hidekiccan/status/828038858151337984", ["犬", "猫"]),
  entry("kawa-ii-uso", "可愛い嘘のカワウソ", "Lommy", "kawa_ii_uso", "カワウソの日常を描くキャラクター漫画。", "キャラクター", "独立短編・4コマ型", "https://x.com/kawa_ii_uso/status/989801584816111616", ["癒やし"]),
  entry("taeko", "耐え子の日常", "そろそろ谷川", "OLtaeko", "理不尽な出来事に耐える女性のコメディ。", "日常・ギャグ", "独立短編・4コマ型", "https://x.com/OLtaeko/status/670961704965042176", ["4コマ"]),
  entry("obungu", "お文具といっしょ", "お文具", "imoko_iimo", "お文具さんたちの日常を描く癒やし作品。", "キャラクター", "独立短編・4コマ型", "https://x.com/imoko_iimo/status/1039127201705127938", ["癒やし"]),
  entry("yamasaki-shigeru", "サラリーマン山崎シゲル", "田中光", "avocadohikaru", "シュールな会社員の日常漫画。", "ギャグ", "独立短編・4コマ型", "https://x.com/avocadohikaru/status/377465793031569408", ["シュール"]),
  entry("nukoo-sama", "ぬこー様ちゃん絵日記", "ぬこー様ちゃん", "nukosama", "漫画家の日常を描くエッセイ漫画。", "エッセイ", "独立短編・4コマ型", "https://x.com/nukosama/status/1505107035071086594", ["日常"]),
  entry("100-wani", "100日後に死ぬワニ", "きくちゆうき", "yuukikikuchi", "100日間毎日更新された完結漫画。", "ドラマ", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/1206558270195822593", ["完結", "話題作"]),
  entry("100-nezumi", "100日後に死ぬ（×）ネズミ", "きくちゆうき", "yuukikikuchi", "100日後に死ぬワニ関連作品。", "ドラマ", "完結アーカイブ型", "https://x.com/yuukikikuchi/status/1826197681129304258", ["完結"]),
  // entry("100-nichi-go-ni-uchikirareru-mangaka", "100日後に打ち切られる漫画家", "浦田カズヒロ", "urata_k", "100日形式で展開された漫画家漫画。", "漫画家・コメディ", "完結アーカイブ型", "https://x.com/urata_k/status/1231152159892262913", ["100日"]),
  // entry("senpai-ga-uzai-kouhai-no-hanashi", "先輩がうざい後輩の話", "しろまんた", "shiromanta1020", "職場の先輩後輩を描くラブコメ。", "恋愛・職場", "完結アーカイブ型", "https://x.com/shiromanta1020/status/909432831041970176", ["恋愛"]),
  entry("15-minutes-before-we-really-date", "マジで付き合う15分前", "Perico", "perico_op", "高校生男女の青春恋愛漫画。", "青春・恋愛", "完結アーカイブ型", "https://x.com/perico_op/status/1177893385513787392", ["青春"]),
  entry("ojineko", "おじさまと猫", "桜井海", "sakurai_umi_", "孤独な男性と猫の交流を描く漫画。", "動物・ドラマ", "試し読み・外部誘導型", "https://x.com/sakurai_umi_/status/874235144307068928", ["猫"]),
  entry("yanisuu", "スーパーの裏でヤニ吸うふたり", "地主", "jinusi822", "スーパー裏で出会う男女の物語。", "恋愛・日常", "試し読み・外部誘導型", "https://x.com/jinusi822/status/1501436920894689281", ["恋愛"]),
  entry("do-tennen", "新しい上司はど天然", "いちかわ暖", "ichikawadan", "天然な上司との会社生活漫画。", "職場・コメディ", "試し読み・外部誘導型", "https://x.com/ichikawadan/status/996031226308837376", ["会社"]),
  entry("warumono-san", "休日のわるものさん", "森川侑", "mori_kw", "悪の組織幹部の休日を描く漫画。", "コメディ", "試し読み・外部誘導型", "https://x.com/mori_kw/status/939159843662786566", ["日常"]),
  // entry("hyouzokusei-danshi-to-ku-ru-na-douryou-joshi", "氷属性男子とクールな同僚女子", "殿ヶ谷美由記", "tonogayamiyuki", "職場恋愛とファンタジーを融合した作品。", "恋愛・ファンタジー", "試し読み・外部誘導型", "https://x.com/tonogayamiyuki/status/1234567890123456789", ["恋愛"]),
  entry("shikimori", "可愛いだけじゃない式守さん", "真木蛍五", "nankatobidesou", "強くてかっこいいヒロインの青春ラブコメ。", "恋愛・青春", "試し読み・外部誘導型", "https://x.com/nankatobidesou/status/1038379729466707969", ["恋愛"]),
  // entry("zettai-bl-ni-naru-sekai-vs-zettai-bl-ni-naritakunai-otoko", "絶対BLになる世界VS絶対BLになりたくない男", "紺吉", "kn_sousaku", "BL世界を舞台にしたメタコメディ。", "ギャグ・BL", "試し読み・外部誘導型", "https://x.com/kn_sousaku/status/1210222912772296704", ["BL", "ギャグ"]),
  entry("off-kai-shitara-tondemonai-yatsu-ga-kita-hanashi", "オフ会したらとんでもないやつが来た話", "mii.m", "__miii___", "SNS時代の出会いを描くコメディ。", "コメディ", "試し読み・外部誘導型", "https://x.com/__miii___/status/1344961449135751169", ["SNS"]),
  entry("zenryona-furyo-kokosei-no-nichijo", "善良な不良高校生の日常", "立葵", "hiyokobeya", "見た目は不良だが善良な高校生たちの日常を描くコメディ。", "学園・コメディ", "試し読み・外部誘導型", "https://x.com/hiyokobeya/status/1755501859589292409", ["学園", "不良", "日常"]),
  entry("after-meruhen", "アフターメルヘン", "田島生野", "ikunoTJTJ", "童話の登場人物たちの物語後を描くファンタジー漫画。", "ファンタジー", "試し読み・外部誘導型", "https://x.com/ikunoTJTJ/status/1455088882299506697", ["童話", "ファンタジー"]),
  entry("kodomo-dorobou", "こどもどろぼう", "山吹", "yamabuki_san", "子どもを盗むという奇妙な設定から始まる人間ドラマ。", "ドラマ・サスペンス", "試し読み・外部誘導型", "https://x.com/yamabuki_san/status/1705213134917751088", ["ドラマ", "家族"]),
  entry("oshushidayo", "おしゅしだよ", "やばいちゃん", "oshushidayo", "個性的な寿司のキャラクターたちを描くシュールな漫画。", "キャラクター・ギャグ", "X完全連載型", "https://x.com/memimimeme/status/397717065861062656", ["寿司", "キャラクター", "シュール"]),
  entry("panda-and-dog", "パンダと犬", "スティーヴン★スピルハンバーグ", "steven_spielham", "パンダのような飼い主と愛犬の日常を描く漫画。", "動物・エッセイ", "X完全連載型", "https://x.com/steven_spielham/status/895921519410397185", ["犬", "エッセイ"]),
  entry("nandemo-nai-enikki", "なんでもない絵日記", "usao", "_usa_ooo", "日々の感情や出来事を柔らかい絵柄で描く絵日記。", "日常・エッセイ", "X完全連載型", "https://x.com/_usa_ooo/status/653449824495271936", ["絵日記", "日常"]),
  // entry("kyou-no-yokoyama-ke", "きょうの横山家", "横山了一", "yokoyama_bancho", "漫画家一家の生活を描くコミックエッセイ。", "家族・エッセイ", "X完全連載型", "https://x.com/yokoyama_bancho", ["家族", "育児", "エッセイ"]),
  entry("uchi-no-joshi-ha-mitame-ga-i", "うちの上司は見た目がいい", "山崎ハルタ", "harutan044", "容姿端麗な上司たちの職場生活を描くコメディ。", "職場・恋愛", "X完全連載型", "https://x.com/harutan044/status/1034698407388971013", ["職場", "恋愛"]),
  // entry("koroshiya-wa-kyou-mo-bba-wo-korosenai", "殺し屋は今日もBBAを殺せない。", "芳明慧", "", "凄腕の老女と殺し屋の攻防を描くアクションコメディ。", "アクション・コメディ", "X完全連載型", "https://x.com/search?q=殺し屋は今日もBBAを殺せない", ["殺し屋", "アクション"]),
  entry("futsuno-keionbu", "ふつうの軽音部", "クワハリ・出内テツオ", "kuwahali", "高校の軽音部で音楽に打ち込む生徒たちを描く青春漫画。", "青春・音楽", "X完全連載型", "https://x.com/kuwahali/status/1602226960188731392", ["軽音楽", "学園", "青春"]),
  // entry("hate-no-hoshi-tsushin", "果ての星通信", "メノタ", "menota", "宇宙の果てに集められた異星人たちの交流を描くSF漫画。", "SF・ファンタジー", "X完全連載型", "https://x.com/search?q=果ての星通信+メノタ", ["宇宙", "SF"]),
  entry("tori-san", "鳥さん。", "よしかわまい", "torisan_manga", "身近な鳥たちを題材にした短編キャラクター漫画。", "動物・4コマ", "独立短編・4コマ型", "https://x.com/torisan_manga/status/1587368853952028672", ["鳥", "4コマ"]),
  entry("chun-manga", "チュンまんが", "dollly", "ddddolly", "スズメを中心とした鳥たちの日常を描く漫画。", "動物・日常", "独立短編・4コマ型", "https://x.com/yoake_regulus/status/980369177071333376", ["鳥", "スズメ"]),
  entry("yamamoto-ahiru-no-jitsuroku-yonkoma", "山本アヒルの実録4コマ", "山本アヒル", "AHIRU_7", "作者の体験や日常をテンポよく描く実録4コマ。", "エッセイ・4コマ", "独立短編・4コマ型", "https://x.com/yoake_regulus/status/980741269453287424", ["実録", "4コマ"]),
  entry("gosujin-daisuki-ponta-no-yuutsu", "ごすじん大好きポン太の憂鬱", "山口さぷり", "sapuriba", "飼い主を慕う犬のポン太を描く動物コメディ。", "動物・コメディ", "独立短編・4コマ型", "https://x.com/yoake_regulus/status/985822130347454466", ["犬", "コメディ"]),
  // entry("hanba-ga-chan-enikki", "ハンバーガーちゃん絵日記", "ハンバーガー", "HundredBurger", "創作活動や日常の出来事を描くコミックエッセイ。", "エッセイ・日常", "独立短編・4コマ型", "https://x.com/HundredBurger/status/1121745044178817025", ["絵日記", "創作"]),
  // entry("shiromaru", "しろまる", "しろまる", "shiromaru0", "白く丸いキャラクターの日常を描く癒やし系漫画。", "キャラクター・日常", "独立短編・4コマ型", "https://x.com/shiromaru0", ["癒やし", "キャラクター"]),
  entry("mokmok-chan", "もくもくちゃん", "mok2mok2", "優しく寄り添う動物たちを描く短編作品。", "キャラクター・癒やし", "独立短編・4コマ型", "https://x.com/mok2mok2/status/667680770782199808", ["動物", "癒やし"]),
  entry("usagi-teikoku", "うさぎ帝国", "endo", "USAGI_TEIKOKU", "独特な言葉遣いのうさぎたちを描くキャラクター漫画。", "キャラクター・ギャグ", "独立短編・4コマ型", "https://x.com/USAGI_TEIKOKU/status/1215937036395302912", ["うさぎ", "シュール"]),
  entry("koupen-chan", "コウペンちゃん", "るるてあ", "k_r_r_l_l_", "日常の行動を肯定してくれるペンギンのキャラクター作品。", "キャラクター・癒やし", "独立短編・4コマ型", "https://x.com/k_r_r_l_l_/status/853723466683473920", ["ペンギン", "癒やし"]),
  entry("sumikko-gurashi", "すみっコぐらし", "サンエックス", "sumikko_335", "部屋の隅を好むキャラクターたちの日常を描く作品。", "キャラクター・日常", "独立短編・4コマ型", "https://x.com/sumikko_335/status/1721482637385285878", ["キャラクター", "癒やし"]),
  // entry("tomodachi-wa-kuma", "ともだちはくま", "さいきたむむ", "saikitamumu", "自由奔放なくまの日常を描くキャラクター漫画。", "キャラクター・ギャグ", "独立短編・4コマ型", "https://x.com/saikitamumu", ["くま", "ギャグ"]),
  entry("doubutsuzoo", "どうぶつーズ", "きくちゆうき", "yuukikikuchi", "個性的な動物たちの生活を描く短編漫画。", "動物・コメディ", "独立短編・4コマ型", "https://x.com/yuukikikuchi/status/509336098338648065", ["動物", "短編"]),
  entry("higuma", "悲熊", "キューライス", "Qrais_Usagi", "悲哀に満ちたくまの日常を描く短編漫画。", "日常・コメディ", "独立短編・4コマ型", "https://x.com/omocoro/status/910703484697112576", ["くま", "哀愁"]),
  // entry("kyou-no-nekomura-san", "きょうの猫村さん", "ほしよりこ", "", "家政婦として働く猫の日常を描く漫画。", "猫・日常", "独立短編・4コマ型", "https://x.com/search?q=きょうの猫村さん", ["猫", "家政婦"]),
  entry("suki-usagi", "スキウサギ", "キューライス", "Qrais_Usagi", "自由気ままなウサギの行動を描くシュールな短編漫画。", "動物・ギャグ", "独立短編・4コマ型", "https://x.com/Qrais_Usagi/status/871529801755934720", ["うさぎ", "シュール"]),
  entry("nekonaughey", "ネコノヒー", "キューライス", "Qrais_Usagi", "うまくいかない日々を送る猫を描く短編漫画。", "動物・日常", "独立短編・4コマ型", "https://x.com/Qrais_Usagi/status/869498881951768576", ["猫", "日常"]),
  // entry("mendako-chan", "メンダコちゃん", "キューライス", "Qrais_Usagi", "メンダコのキャラクターを中心に描く短編漫画。", "動物・キャラクター", "独立短編・4コマ型", "https://x.com/search?q=メンダコちゃん+キューライス", ["海洋生物", "癒やし"]),
  entry("fushigineko", "ふしぎねこのきゅーちゃん", "にとりささみ", "nitorisasami", "不思議な猫と青年の暮らしを描く日常漫画。", "猫・日常", "独立短編・4コマ型", "https://x.com/twi_yon/status/958097574665379840", ["猫", "ほのぼの"]),
  entry("neko-no-boo", "ねこのぶーちゃん", "高橋きの", "tantan_0502", "丸い猫のぶーちゃんの日常を描く短編漫画。", "猫・キャラクター", "独立短編・4コマ型", "https://x.com/tantan_0502/status/1161566416102756352", ["猫", "癒やし"]),
  // entry("yajima-ke-no-neko-manga", "やじま家の猫漫画", "やじま", "yajima_en", "作者と暮らす猫たちの様子を描くコミックエッセイ。", "猫・エッセイ", "独立短編・4コマ型", "https://x.com/yajima_en", ["猫", "実録"]),
  entry("100-taishoku-47-sai", "100日後に退職する47歳", "TOME", "tome_ura", "退職までの日々を100日形式で描いた会社員漫画。", "職場・ドラマ", "完結アーカイブ型", "https://x.com/tome_ura/status/1414796451054383107", ["100日", "会社", "完結"]),
  entry("100-keiyaku-ekiin-san", "100日後にやめる契約駅員さん", "ザバック", "theback_blog", "契約駅員が退職するまでを描いた100日漫画。", "職場・エッセイ", "完結アーカイブ型", "https://x.com/theback_blog/status/1529945077589475328", ["駅員", "100日"]),
  entry("100-gyakuten-otaku", "100日後に運命が逆転するオタク", "たけくん", "zizio413", "オタクの生活が変化していく様子を100日形式で描く漫画。", "日常・ドラマ", "完結アーカイブ型", "https://x.com/zizio413/status/1923686303511740888", ["100日", "オタク"]),
  entry("100-kuwareru-buta", "100日後に食われるブタ", "カルビ", "Mini_pig99", "食べられる運命のブタを追った100日形式の作品。", "動物・ドキュメンタリー", "完結アーカイブ型", "https://x.com/Mini_pig99/status/1399982956634988546", ["100日", "動物"]),
  entry("100-kekkon", "100日後に結婚する二人", "畑健二郎", "hatakenjiro", "男女が結婚に至るまでを毎日描いた恋愛漫画。", "恋愛・日常", "完結アーカイブ型", "https://x.com/hatakenjiro/status/1277042528848470017", ["100日", "恋愛"]),
  // entry("100-nichi-kan-ikita-wani", "100日間生きたワニ", "きくちゆうき", "yuukikikuchi", "100日後に死ぬワニを原作とする関連作品。", "ドラマ", "完結アーカイブ型", "https://x.com/search?q=100日間生きたワニ", ["ワニ", "関連作品"]),
  // entry("30-nichi-go-ni-shinu-kani", "30日後に死ぬカニ", "作者確認中", "", "死までの日常をカウントダウン形式で描いた短期連載漫画。", "日常・ドラマ", "完結アーカイブ型", "https://x.com/search?q=30日後に死ぬカニ", ["30日", "完結"]),
  entry("bokutsuma", "僕の妻は感情がない", "杉浦次郎", "sugiura_jirou", "家事ロボットと人間の夫婦生活を描くSFラブコメ。", "SF・恋愛", "完結アーカイブ型", "https://x.com/sugiura_jirou/status/1169928952514658304", ["ロボット", "恋愛"]),
  // entry("tora-to-hachidori", "トラとハチドリ", "ヨドカワ", "ydkw27", "ファッション業界を舞台に二人の女性を描く仕事漫画。", "職業・ドラマ", "完結アーカイブ型", "https://x.com/search?q=トラとハチドリ+漫画", ["ファッション", "仕事"]),
  // entry("youkai-otoko-watch", "妖怪男ウォッチ", "島袋全優", "shimazenyu", "妖怪のような男性たちとの出来事を描くギャグ漫画。", "ギャグ・エッセイ", "完結アーカイブ型", "https://x.com/search?q=妖怪男ウォッチ", ["妖怪", "実録"]),
  // entry("fujoshi-no-tsuzui-san", "腐女子のつづ井さん", "つづ井", "wacchoichoi", "腐女子仲間との愉快な日常を描くコミックエッセイ。", "エッセイ・オタク", "完結アーカイブ型", "https://x.com/wacchoichoi", ["腐女子", "友人"]),
  // entry("kuma-miko-bangai-hen", "くまみこ番外編", "吉元ますめ", "masume_y", "巫女と熊の日常を描く本編周辺の短編漫画。", "日常・ファンタジー", "完結アーカイブ型", "https://x.com/search?q=くまみこ+番外編+吉元ますめ", ["熊", "巫女"]),
  // entry("ojisan-to-joshikousei", "おじさんと女子高生", "加藤マユミ", "katomayumi", "年齢の離れた二人の交流を描く連作漫画。", "恋愛・ドラマ", "完結アーカイブ型", "https://x.com/katomayumi", ["恋愛", "年の差"]),
  // entry("deai-kei-saito-de-imouto-to-deau-hanashi", "出会い系サイトで妹と出会う話", "もちオーレ", "konpuudo", "出会い系で実の妹と遭遇する導入から始まる百合漫画。", "百合・コメディ", "完結アーカイブ型", "https://x.com/konpuudo", ["百合", "姉妹"]),
  // entry("draft-king", "ドラフトキング", "クロマツテツロウ", "drking_jp", "プロ野球のスカウトを主人公にした仕事漫画。", "スポーツ・職業", "試し読み・外部誘導型", "https://x.com/search?q=ドラフトキング+第1話", ["野球", "スカウト"]),
  entry("galsawa", "釣って食べたいギャル澤さん", "ふなつかずき", "funatsukazuki", "釣り好きのギャルと釣った魚を味わうグルメ漫画。", "釣り・グルメ", "試し読み・外部誘導型", "https://x.com/GrandJump/status/1920470042413789289", ["釣り", "ギャル"]),
  // entry("mono", "mono", "あfろ", "afro_2021", "写真部と映画研究部の活動を描くガールズ漫画。", "日常・趣味", "試し読み・外部誘導型", "https://x.com/search?q=mono+あfろ+第1話", ["写真", "映像"]),
  entry("chi", "チ。―地球の運動について―", "魚豊", "uoto_z", "地動説を研究する人々の信念と闘争を描く歴史漫画。", "歴史・科学", "試し読み・外部誘導型", "https://x.com/chikyu_chi/status/1842159463656227170", ["天文学", "歴史"]),
  // entry("feruma-no-ryouri", "フェルマーの料理", "小林有吾", "Aoashi_Kobayashi", "数学的思考を料理へ応用する青年を描く料理漫画。", "料理・数学", "試し読み・外部誘導型", "https://x.com/search?q=フェルマーの料理+第1話", ["数学", "料理"]),
  // entry("spy-family", "SPY×FAMILY", "遠藤達哉", "spyfamily_anime", "偽装家族となったスパイ、殺し屋、超能力者を描くコメディ。", "アクション・コメディ", "試し読み・外部誘導型", "https://x.com/search?q=SPY×FAMILY+第1話+公式", ["スパイ", "家族"]),
  // entry("hagane-no-renkinjutsushi", "鋼の錬金術師", "荒川弘", "gangan_hagaren", "禁忌を犯した兄弟が身体を取り戻す旅に出るダークファンタジー。", "ファンタジー・冒険", "試し読み・外部誘導型", "https://x.com/search?q=鋼の錬金術師+第1話+公式", ["錬金術", "冒険"]),
  // entry("spy-classroom", "スパイ教室", "竹町・せうかなめ", "spyroom_anime", "落ちこぼれの少女スパイたちが不可能任務へ挑む物語。", "スパイ・ファンタジー", "試し読み・外部誘導型", "https://x.com/search?q=スパイ教室+漫画+第1話", ["スパイ", "少女"]),
  entry("isagi", "竜送りのイサギ", "星野真", "MKT_0220", "竜を弔う少年の旅を描く和風ファンタジー。", "ファンタジー・冒険", "試し読み・外部誘導型", "https://x.com/MKT_0220/status/1698251699285266704", ["竜", "和風"]),
  // entry("paatii-rabu", "パーティーラブ", "作者確認中", "", "パーティーを舞台に男女の関係を描く恋愛漫画。", "恋愛・コメディ", "試し読み・外部誘導型", "https://x.com/search?q=パーティーラブ+漫画", ["恋愛", "パーティー"]),
  entry("nanji", "汝、星のごとく", "古里こう", "kou_hane", "瀬戸内の島を舞台に男女の人生を描く小説コミカライズ。", "恋愛・ドラマ", "試し読み・外部誘導型", "https://x.com/kou_hane/status/1856623186932338859", ["恋愛", "島"]),
  // entry("sudachi-no-maoujou", "すだちの魔王城", "森下真", "sin_morishita", "魔王討伐後の世界で道具屋を営む青年のファンタジー。", "ファンタジー・コメディ", "試し読み・外部誘導型", "https://x.com/search?q=すだちの魔王城+第1話", ["魔王", "道具屋"]),
  entry("meteor-rear", "氷核のメテオリア", "冬堂誠", "makoto_todo_", "氷に覆われた世界を舞台にしたダークファンタジー。", "ファンタジー・アクション", "試し読み・外部誘導型", "https://x.com/webcomicaction/status/1799345362387558651", ["氷", "冒険"]),
  // entry("mamono-gurai", "魔物喰らい", "作者確認中", "", "倒した魔物を食べて力を得る冒険者を描く作品。", "ファンタジー・冒険", "試し読み・外部誘導型", "https://x.com/search?q=魔物喰らい+漫画+第1話", ["魔物", "冒険"]),
  // entry("onihana", "鬼の花嫁", "クレハ・富樫じゅん", "onihana_info", "あやかしの花嫁に選ばれた少女を描く和風恋愛ファンタジー。", "恋愛・ファンタジー", "試し読み・外部誘導型", "https://x.com/search?q=鬼の花嫁+漫画+第1話", ["あやかし", "花嫁"]),
  // entry("kaotsuki", "顔憑", "作者確認中", "", "人の顔に現れる異形をめぐるホラー漫画。", "ホラー・サスペンス", "試し読み・外部誘導型", "https://x.com/search?q=顔憑+漫画", ["怪異", "ホラー"]),
  entry("garden-hunt", "ガーデンハント", "カミエナ", "KamiEna_Game", "危険な庭園を舞台に展開するサバイバル作品。", "サバイバル・アクション", "試し読み・外部誘導型", "https://x.com/KamiEna_Game/status/2021422933856616816", ["サバイバル", "庭園"]),
  // entry("asobi-de-yatteru-dake-nanoni", "遊びでやってるだけなのに", "作者確認中", "", "趣味の活動と人間関係をめぐる青春漫画。", "青春・日常", "試し読み・外部誘導型", "https://x.com/search?q=遊びでやってるだけなのに+漫画", ["青春", "趣味"]),
  entry("shiro-hiyo", "白豚貴族ですが前世の記憶が生えたのでひよこな弟育てます", "よこわけ", "fujiokayouko", "弟に殺される未来を回避するため育成に奮闘する物語。", "ファンタジー・家族", "試し読み・外部誘導型", "https://x.com/TOBOOKS/status/1657943719637839872", ["転生", "姉弟"]),
  entry("kyou-kara-esper-sadamichi", "今日からエスパー貞道", "加太潤一", "ZyZtn", "拉致被害を契機に超能力を得た人物を描く実録風漫画。", "実録・サスペンス", "試し読み・外部誘導型", "https://x.com/ZyZtn/status/1605882603168333825", ["超能力", "実録"]),
  entry("cyber-punk-momotaro", "サイバーパンク桃太郎", "Rootport", "rootport", "生成AIを活用し昔話をサイバーパンク風に再構成した漫画。", "SF・実験漫画", "試し読み・外部誘導型", "https://x.com/rootport/status/1557233170348617728", ["生成AI", "桃太郎"]),
  entry("share-house-with-terminator", "シェアハウス ウィズ ターミネーター", "佐藤スズ", "satou__suzu", "自分を狙う未来ロボットとの奇妙な同居生活を描く短編。", "SF・コメディ", "試し読み・外部誘導型", "https://x.com/satou__suzu/status/1849282730288365668", ["ロボット", "同居"]),
  // entry("ashi-wo-ushinatta-koukousei-no-hanashi", "足を失った高校生の話", "うおやま", "uoyamangamanga", "足を失った高校生の生活と周囲との関係を描く物語。", "青春・ドラマ", "試し読み・外部誘導型", "https://x.com/uoyamangamanga/status/1923338802942095462", ["高校生", "ドラマ"]),
  // entry("gomen-nasai-meshia-chan", "ごめんなさい、メシアちゃん", "大瀬戸陸", "", "虐待を受ける少女と母の愛人の交流を描く作品。", "ドラマ・ヒューマン", "試し読み・外部誘導型", "https://x.com/search?q=ごめんなさいメシアちゃん+漫画", ["救世主", "虐待"]),
  // entry("ichiban-umakute-yasashii-kubi-no-kirikata", "一番うまくて優しい、首の斬り方。", "星野真", "MKT_0220", "処刑と竜送りをめぐる物語の導入を描いた試し読み投稿。", "ファンタジー・ドラマ", "試し読み・外部誘導型", "https://x.com/MKT_0220/status/1745408378271305855", ["処刑", "竜"]),
  // entry("eigakan", "映画館", "作者確認中", "", "映画館を舞台に人間関係や出来事を描く短編漫画。", "短編・ドラマ", "試し読み・外部誘導型", "https://x.com/search?q=映画館+漫画が読めるハッシュタグ", ["映画", "読切"]),
  // entry("jc-ga-jc-wo-nanpa-shitara-otoko-no-musuko-datta-hanashi", "JCがJCをナンパしたら男の娘だった話", "作者確認中", "", "女子中学生同士の出会いから始まるラブコメ漫画。", "青春・ラブコメ", "試し読み・外部誘導型", "https://x.com/search?q=JCがJCをナンパしたら男の娘だった話", ["男の娘", "青春"]),
  // entry("yasashikute-daisuki-na-boku-no-okaasan", "優しくて大好きな僕のお母さん", "作者確認中", "", "母子の関係を題材にしたドラマ性のある短編漫画。", "家族・ドラマ", "試し読み・外部誘導型", "https://x.com/search?q=優しくて大好きな僕のお母さん+漫画", ["家族", "母子"]),

  // // ハッシュタグ発の読切・短編を追加
  // entry("x-to-rakuen", "Xと楽園", "富士山まる（ふ市長）", "Fushicho55", "Xに支配された世界で自由を求め楽園を目指す少年の物語。", "ファンタジー・冒険", "独立短編・4コマ型", "https://x.com/Fushicho55/status/1759141328083153286", ["読切", "SNS"]),
  // entry("nebou-shita-shoujo-ga-bakusou-suru-dake-no-manga", "寝坊した少女が爆走するだけの漫画", "指宿", "ibsukionsen", "寝坊した少女が学校へ向かって爆走するだけの物語。", "青春・コメディ", "独立短編・4コマ型", "https://x.com/ibsukionsen/status/2074467034054979772", ["読切", "青春"]),
  // entry("shoubu-de-yareru-to-ki-ni-sareru-kitsune-no-sekai", "勝負で敗れると「木」にされる狐の世界", "こんづくし", "uj_kondukushi", "勝負に敗れると木にされる狐たちの奇妙な世界を描く物語。", "ファンタジー・コメディ", "独立短編・4コマ型", "https://x.com/uj_kondukushi/status/2014662342647415284", ["読切", "ファンタジー"]),
  // entry("sainou-ga-kaika", "才能が開花", "ごぼふく", "gobohuku", "ある日突然才能が開花する少年の物語。", "青春・コメディ", "独立短編・4コマ型", "https://x.com/gobohuku/status/2081311230430777809", ["4コマ", "読切"]),

  entry("kore-kaite-shine", "これ描いて死ね", "とよ田みのる", "poo1007", "漫画を愛する高校生たちの創作青春物語", "日常・ファンタジー", "試し読み・外部誘導型", "https://x.com/poo1007/status/1524588431237472256", ["漫画", "青春", "創作"]),
  entry("puniru", "ぷにるはかわいいスライム", "まえだくん", "maedakun_PR", "美少女に変身するスライムと少年のドタバタラブコメ", "キャラクター・ギャグ", "試し読み・外部誘導型", "https://x.com/PUNIRUcorocoro/status/1660557151704866817", ["スライム", "ラブコメ", "コメディ"]),
];

const formats: Format[] = ["X完全連載型", "独立短編・4コマ型", "完結アーカイブ型", "試し読み・外部誘導型"];

export function MangaDirectory() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<Format>("X完全連載型");
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => mangaList.filter((manga) => {
    const haystack = [manga.title, manga.author, manga.handle, manga.summary, manga.genre, manga.format, ...manga.tags].join(" ").toLowerCase();
    return normalizedQuery
      ? haystack.includes(normalizedQuery)
      : manga.format === format;
  }), [format, normalizedQuery]);

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="いちわ ホーム"><span className="brand-mark">一</span><span>いちわ</span></a>
      <nav aria-label="メインナビゲーション"><a href="#top">作品を探す</a><a href="#about">このサイトについて</a></nav>
      <a className="submit-link" href="https://x.com/butchi_y">作品を掲載する (DM)<span>↗</span></a>
    </header>
    <section className="directory" id="top">
      <div className="section-heading"><div><p className="eyebrow"><span /> WEB COMIC DIRECTORY</p><h1>第1話から、探す。</h1></div><p>いま読める <strong>{mangaList.length}</strong> 作品</p></div>
      <p className="directory-intro">Xで読めるWeb漫画を、作品・作者・公開形式から探せる一覧です。気になるキャラクターや話題の作品は、公式ポストから第1話へ。最新話、全巻、映画化などの最新情報は、作品ごとの公式アカウントや出版社の案内もあわせてご確認ください。</p>
      <div className="search-row">
        <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">作品を検索</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="タイトル・作者・キーワードで検索" /></label>
        <div className="genre-list" aria-label="公開形式で絞り込む">{formats.map((item) => <button className={format === item ? "active" : ""} key={item} onClick={() => setFormat(item)}>{item}</button>)}</div>
      </div>
      <p className="collection-note">{normalizedQuery ? "検索中はすべての公開形式から作品を探します。" : "分類を切り替えると、その分類の公式Xポストだけを読み込みます。"}</p>
      {filtered.length ? <div className="manga-grid">{filtered.map((manga, index) => <MangaCard manga={manga} number={index + 1} key={manga.title} />)}</div> : <div className="empty-state"><span>〇</span><h3>作品が見つかりませんでした</h3><p>検索ワードや公開形式を変えてみてください。</p></div>}
      <section className="ad-section" aria-label="スポンサー広告">
        <p className="ad-label">SPONSORED</p>
        <AdSenseUnit className="ad-frame" slot="4301222298" />
      </section>
    </section>
    <section className="about" id="about"><p className="eyebrow"><span /> ABOUT ICHIWA</p><div className="about-grid"><h2>たった1話から、<br />好きがはじまる。</h2><div><p>「いちわ」は、Xで公開されているWeb漫画の第1話を集めた小さな本棚です。作者本人または出版社公式アカウントの投稿だけを掲載し、物語の入口へ直接つなぎます。</p><p>連載中の作品は最新話を追う入口として、完結作品は読み返し用のアーカイブとして整理しています。書籍の全巻情報、映画・アニメなどの映像化、キャラクター情報は変更されることがあるため、購入や視聴の前には各作品の公式案内をご確認ください。</p><p className="note">公開形式：X完全連載型／独立短編・4コマ型／完結アーカイブ型／試し読み・外部誘導型</p><p className="ai-notice">サイト制作の一部に生成AIを利用しています。掲載内容に問題があればXのDMにてご連絡ください。</p></div></div></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">一</span><span>いちわ</span></a><p>Web漫画の第1話が見つかる場所。</p><p className="copyright">© 2026 <a href="https://x.com/butchi_y">岩淵夕希物智</a></p></footer>
  </main>;
}

function MangaCard({ manga, number }: { manga: Manga; number: number }) {
  return <article className="manga-card">
    <div className={`post-preview ${manga.accent}`}>{manga.xPostUrl ? <XPostEmbed url={manga.xPostUrl} label={`${manga.title} ${manga.entryLabel}`} /> : <OfficialPostPending manga={manga} />}<span className="card-number">{String(number).padStart(2, "0")}</span></div>
    <div className="card-content"><div className="card-genre">{manga.format}</div><h3>{manga.title}</h3><p className="author">{manga.author} {manga.handle.startsWith("@") ? <a className="author-handle" href={`https://x.com/${manga.handle.slice(1)}`} target="_blank" rel="noopener noreferrer" aria-label={`${manga.author}のXアカウント`}>{manga.handle}</a> : <span>{manga.handle}</span>}</p><p className="summary">{manga.summary}</p><div className="tags">{manga.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{manga.xPostUrl ? <a className="read-link" href={manga.xPostUrl} target="_blank" rel="noopener noreferrer">Xで{manga.entryLabel} <span>→</span></a> : <span className="read-link is-pending">公式ポストを確認中 <span>—</span></span>}</div>
  </article>;
}

function OfficialPostPending({ manga }: { manga: Manga }) {
  return <div className="embed-pending"><span aria-hidden="true">𝕏</span><p>公式ポストを確認中</p><small>{manga.handle}</small></div>;
}

function XPostEmbed({ url, label }: { url: string; label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => window.twttr?.widgets.load(container.current ?? undefined);
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://platform.twitter.com/widgets.js"]');
    if (existing) {
      existing.addEventListener("load", load);
      load();
      return () => existing.removeEventListener("load", load);
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.addEventListener("load", load);
    document.body.appendChild(script);
    return () => script.removeEventListener("load", load);
  }, []);

  return <div className="x-embed" ref={container}><blockquote className="twitter-tweet" data-dnt="true" data-conversation="none"><a href={url}>{label}</a></blockquote></div>;
}

declare global {
  interface Window {
    twttr?: { widgets: { load: (element?: HTMLElement) => void } };
  }
}
