import DynamicContent from '../../../learning-theme/components/DynamicContent.vue'
import CobLanding from '../../../learning-theme/layouts/CoBLanding.vue'
import FirstContent from '../../../learning-theme/layouts/FirstContent.vue'
import TT from '../../../learning-theme/vendor/theme-default/index'
import '../../../learning-theme/styles/custom.css'

export default TT

export function enhance({ app }) {
    app.component('RestrictedContent', DynamicContent)
        app.component('cob_home', CobLanding)
        app.component('direct_to_first', FirstContent)
}
