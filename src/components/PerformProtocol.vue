<template>
  <div>
    <ExecuteProtocol :protocol="protocol" />
  </div>
</template>

<script>
import protocolObj from '@/data/ddsa_adult.json'
import { Protocol } from '@openclinical/proformajs'
import ExecuteProtocol from './ExecuteProtocol.vue'
export default {
  name: 'PerformProtocol',
  components: {
    ExecuteProtocol
  },
  data() {
    return {
      protocol: null
    }
  },
  methods: {
    getProtocol() {
      return new Protocol[protocolObj.class](protocolObj)
    }
  },
  mounted() {
    this.protocol = this.getProtocol()
  }
}
</script>

<style lang="scss" scoped></style>
