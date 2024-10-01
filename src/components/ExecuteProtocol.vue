<template>
  <p-template-mobile
    v-if="!exception"
    :enactment="enactment"
    :options="options"
    @change-enactment="updateEnactment"
    @restart-enactment="resetEnactment"
  >
    <template v-slot:finished>
      <slot name="finished"></slot>
    </template>
  </p-template-mobile>
  <div v-else>
    <div class="row mt-5">
      <div class="col-6 offset-3">
        <h3 class="my-3">Exception</h3>
        <p>A runtime exception occurred</p>
        <p class="text-danger">{{ exception }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Enactment } from '@openclinical/proformajs'
import TemplateMobile from './TemplateMobile.vue'

export default {
  props: {
    protocol: Object
  },
  components: {
    'p-template-mobile': TemplateMobile
  },
  data: function () {
    return {
      json: null,
      options: {
        Decision: {
          showInactiveArguments: false,
          showExpressions: false,
          allowDownloads: false
        },
        Enquiry: {
          useDefaults: true
        },
        Candidate: {
          autoConfirmRecommended: true
        },
        debug: false
      },
      exception: null
    }
  },
  computed: {
    enactment() {
      return this.json ? Enactment.inflate(this.json) : null
    }
  },
  methods: {
    updateEnactment(evt) {
      this.json = JSON.stringify(evt.value)
    },
    resetEnactment() {
      if (this.protocol && this.protocol.isValid()) {
        try {
          let local = new Enactment({
            start: true,
            protocol: this.protocol,
            options: this.enactmentOptions
          })
          this.json = JSON.stringify(local)
          this.exception = null
          this.$emit('start-enactment')
        } catch (e) {
          this.exception = e.message
        }
      } else {
        this.json = null
      }
    }
  },
  created: function () {
    this.resetEnactment()
  },
  watch: {
    protocol: {
      // https://stackoverflow.com/questions/44584078/vuejs-2-0-cant-hook-a-component-on-props-update
      deep: true, // without this flag changes only percolate when the protocol is saved
      handler() {
        // val, oldval
        this.resetEnactment()
      }
    }
  }
}
</script>
