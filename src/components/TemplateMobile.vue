<template>
  <main>
    <div class="container-fluid">
      <div v-if="enactment">
        <div class="row">
          <div class="col">
            <div v-if="status.finished">
              <slot name="finished">
                <div class="d-grid gap-2 mt-2">
                  <h3>Completed</h3>
                  <button class="btn" @click="getJson">View Json object</button>
                  <button class="btn btn-outline-secondary d-block" @click="restartEnactment">
                    <font-awesome-icon icon="redo-alt" /> Restart
                  </button>
                </div>
                <div v-if="Object.values(decisionObj).length">
                  <json-viewer
                    :value="decisionObj"
                    :expand-depth="5"
                    copyable
                    boxed
                    sort
                  ></json-viewer>
                </div>
              </slot>
            </div>
            <div v-else>
              <p-task
                :task="activeTask"
                :enactment="enactment"
                @update-enactment="updateEnactment"
                :options="options"
                @send-trigger="sendTrigger"
                class="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { EnactmentMixin } from '@openclinical/proformajs-vue3-perform'

export default {
  mixins: [EnactmentMixin],
  emits: ['restart-enactment'],
  data() {
    return {
      decisionObj: {}
    }
  },
  methods: {
    restartEnactment() {
      this.view = 'task'
      this.$emit('restart-enactment')
    },
    getDecisions(enactment) {
      let decisions = {}
      for (let [key, value] of Object.entries(enactment._state)) {
        decisions[key] = {
          state: value.state,
          result: value.result,
          candidates: value.candidates
        }
      }
      return decisions
    },
    getProcessedData(enactment) {
      let status = enactment.getStatus()
      let state = enactment._state
      let audit = enactment._audit
      let data = enactment._data

      return {
        protocol: enactment.protocol.name,
        startTime: audit[0].timestamp,
        endTime: audit[audit.length - 1].timestamp,
        status: status,
        data: data,
        tasks: Object.entries(state).map(([key, value]) => ({
          name: key,
          state: value.state,
          completionTime: value.completionTime,
          type: value.design.constructor.name
        })),
        decisions: Object.entries(state)
          // eslint-disable-next-line no-unused-vars
          .filter(([_, value]) => value.design)
          .map(([key, value]) => ({
            name: key,
            result: value.result,
            candidates: value.candidates
          })),
        audit: audit
      }
    },
    getJson() {
      let decisions = this.getProcessedData(this.enactment)
      this.decisionObj = decisions
    }
  }
}
</script>
