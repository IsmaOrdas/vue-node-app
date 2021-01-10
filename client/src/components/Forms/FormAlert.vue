<template>
<div class="form-alert" :class='cssClass'>
  <slot></slot>
</div>
</template>

<script>
import Constants from "@/infraestructure/Constants";
export default {
  name: "FormAlert",
  props: {
    type: {
      type: String,
      required: false,
      validator: propType => {
        return Constants.WARNING_TYPES.includes(propType.toUpperCase());
      }
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    cssClass () {
      return {
        'hidden': !this.show,
        'form-alert--error': this.type === 'error',
        'form-alert--warn': this.type === 'warning',
        'form-alert--success': this.type === 'success'
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.form-alert {
  @apply rounded text-sm mb-4 p-2;

  &.form-alert--error {
    @apply bg-red-400 text-white;
  }

  &.form-alert--warn {
    @apply bg-yellow-200 text-black;
  }

  &.form-alert--success {
    @apply bg-green-400 text-white;
  }

}
</style>