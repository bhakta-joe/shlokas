interface Word {
    word: string
    translation: string
}

export interface Verse {
    number: string
    text: string
    translation: string
    words?: Word[]
}

export const verses: Verse[] = [
    {
        number: 'BG 1.1',
        text: `
        dhṛtarāṣṭra uvāca
        dharma-kṣetre kuru-kṣetre
        samavetā yuyutsavaḥ
        māmakāḥ pāṇḍavāś caiva
        kim akurvata sañjaya
        `,
        translation: "Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?",
        words: [
            { word: "samavetā", translation: "assembled" },
            { word: "yuyutsavaḥ", translation: "desiring to fight" },
            { word: "māmakāḥ", translation: "my party (sons)" },
            { word: "samavetā", translation: "assembled" },
            { word: "yuyutsavaḥ", translation: "desiring to fight" },
            { word: "māmakāḥ", translation: "my party (sons)" },
            { word: "samavetā", translation: "assembled" },
            { word: "yuyutsavaḥ", translation: "desiring to fight" },
            { word: "māmakāḥ", translation: "my party (sons)" },
        ]
    },
    {
        number: 'BG 2.13',
        text: `
        dehino ’smin yathā dehe
        kaumāraṁ yauvanaṁ jarā
        tathā dehāntara-prāptir
        dhīras tatra na muhyati
        `,
        translation: "As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change."
    },
    {
        number: 'BG 2.20',
        text: `
        na jāyate mriyate vā kadācin
        nāyaṁ bhūtvā bhavitā vā na bhūyaḥ
        ajo nityaḥ śāśvato ’yaṁ purāṇo
        na hanyate hanyamāne śarīre
        `,
        translation: "For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain."
    },
    {
        number: 'BG 2.22',
        text: `
        vāsāṁsi jīrṇāni yathā vihāya
        navāni gṛhṇāti naro ’parāṇi
        tathā śarīrāṇi vihāya jīrṇāny
        anyāni saṁyāti navāni dehī
        `,
        translation: "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones."
    }
    ,
    {
        number: 'BG 18.66',
        text: `
        sarva-dharmān parityajya
        mām ekaṁ śaraṇaṁ vraja
        ahaṁ tvāṁ sarva-pāpebhyo
        mokṣayiṣyāmi mā śucaḥ
        `,
        translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
    }
]