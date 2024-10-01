<template>
  <div>
    <ExecuteProtocol :protocol="protocolObj" />
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
  computed: {
    protocolObj() {
      return new Protocol[protocolObj.class](protocolObj)
    }
  }
}
</script>

<style lang="scss" scoped></style>
