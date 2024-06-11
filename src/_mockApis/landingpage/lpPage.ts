import { ref } from 'vue';

import type {
    ProductsSliderTypes,
    UserReviewTypes,
    ListFeatureTypes,
    DemosMegaMenuTypes,
    AppsMegaMenuTypes
} from '@/types/landingpage/LandingpageTypes';


/*User Review Section*/
import review1 from '@/assets/images/profile/user-1.jpg';
import review2 from '@/assets/images/profile/user-2.jpg';
import review3 from '@/assets/images/profile/user-3.jpg';

const userReview: UserReviewTypes[] = [
    {
        img: review2,
        title: 'Julia Message',
        subtitle: 'Palhaça voluntária desde 2015',
        review: 'Ser voluntário, utilizando a figura do Palhaço transforma o ambiente em que estamos e leva o outro a perceber, que por meio do "ridículo" os erros não devem ser escondidos, mas revelados, nos levando a aceitação de quem somos e como estamos... É um sensação extraordinária, conseguir fazer com que o outro se sinta bem através de um simples sorriso.'
    },
    {
        img: review1,
        title: 'Cristian Machado',
        subtitle: 'Palhaço voluntário desde 2018',
        review: 'Fazer parte da ONG Viver de Rir, e poder transmitir um pouco de atenção, uma brincadeira, um sorriso, ou até mesmo um simples olhar, faz com que tudo na vida valha a pena. E a retribuição e o reconhecimento de nossa presença a cada visita, alimenta nossa alma...'
    },
    {
        img: review2,
        title: 'Maitê Medeiros',
        subtitle: 'Palhaça voluntária desde 2019',
        review: 'A grandeza do voluntariado me acompanha todo dia, quando eu consigo aplicar a leveza do palhaço no meu trabalho, a vulnerabilidade do palhaço no meu convívio familiar, a alegria do palhaço no meu círculo de amigos e a inocência do palhaço toda a vez que olho para o rostinho da minha filha. Essa frase resume tudo: “Virei palhaço para fazer o bem e que bem me faz ser palhaço.'
    },
    {
        img: review3,
        title: 'Elisabeth Monteiro',
        subtitle: 'Palhaça voluntária desde 2020',
        review: 'Ser voluntário é despertar o sentimento de empatia,compaixão e sensibilidade. Fazer parte da ong Viver de Rir é compartilhar amor, sendo isso gratificante e recompensador. O bem que é doado tem 100% de retorno.'
    }
];

/*Feature Section*/
/*import tabler icons*/
import {
    WandIcon,
    ShieldLockIcon,
    ArchiveIcon,
    AdjustmentsIcon,
    TagIcon,
    DiamondIcon,
    DatabaseIcon,
    LanguageKatakanaIcon,
    BuildingCarouselIcon,
    ArrowsShuffleIcon,
    ChartPieIcon,
    LayersIntersectIcon,
    RefreshIcon,
    BookIcon,
    CalendarIcon,
    MessageIcon
} from 'vue-tabler-icons';
const listFeature: ListFeatureTypes[] = [
    {
        icon: WandIcon,
        title: '6 Theme Colors',
        subtitle: 'We have included 6 pre-defined Theme Colors with Modernize Admin.'
    },
    {
        icon: ShieldLockIcon,
        title: 'Authguard',
        subtitle: 'We have AUTH guard functionality which is based on JWT.'
    },
    {
        icon: ArchiveIcon,
        title: '65+ Page Templates',
        subtitle: 'Yes, we have 5 demos & 65+ Pages per demo to make it easier.'
    },
    {
        icon: AdjustmentsIcon,
        title: '45+ UI Components',
        subtitle: 'Almost 45+ UI Components being given with Modernize Admin Pack.'
    },
    {
        icon: TagIcon,
        title: 'Vuetify',
        subtitle: 'It is made with Vuetify which is a powerful UI Component Framework.'
    },
    {
        icon: DiamondIcon,
        title: '3400+ Font Icons',
        subtitle: 'Lots of Icon Fonts are included here in the package of Modernize Admin.'
    },
    {
        icon: DatabaseIcon,
        title: 'Axios',
        subtitle: 'Axios is a promise-based HTTP Client for node.js and the browser.'
    },
    {
        icon: LanguageKatakanaIcon,
        title: 'i18n Vue',
        subtitle: 'Vue i18n is a powerful internationalization framework for Vue.'
    },
    {
        icon: BuildingCarouselIcon,
        title: 'Vue3 Carousel',
        // subtitle: 'The Last Vue3 Carousel You will Ever Need!'
        subtitle: 'Flexible, responsive, and highly customizable Vue carousel component'
    },
    {
        icon: ArrowsShuffleIcon,
        title: 'Easy to Customize',
        subtitle: 'Customization will be easy as we understand your pain.'
    },
    {
        icon: ChartPieIcon,
        title: 'Lots of Chart Options',
        subtitle: 'You name it and we have it, Yes lots of variations for Charts.'
    },
    {
        icon: LayersIntersectIcon,
        title: 'Lots of Table Examples',
        subtitle: 'Data Tables are initial requirement and we added them.'
    },
    {
        icon: RefreshIcon,
        title: 'Regular Updates',
        subtitle: 'We are constantly updating our pack with new features.'
    },
    {
        icon: BookIcon,
        title: 'Detailed Documentation',
        subtitle: 'We have made detailed documentation, so it will easy to use.'
    },
    {
        icon: CalendarIcon,
        title: 'Calendar Design',
        subtitle: 'Calendar is available with our package & in nice design.'
    },
    {
        icon: MessageIcon,
        title: 'Dedicated Support',
        subtitle: 'We believe in supreme support is key and we offer that.'
    }
];

export { userReview, listFeature };
