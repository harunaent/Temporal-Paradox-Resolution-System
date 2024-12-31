;; Temporal Paradox Scenarios Contract

(define-data-var last-scenario-id uint u0)

(define-map paradox-scenarios
  { scenario-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    description: (string-utf8 1000),
    parameters: (list 10 (string-ascii 50)),
    status: (string-ascii 20)
  }
)

(define-public (create-paradox-scenario (title (string-ascii 100)) (description (string-utf8 1000)) (parameters (list 10 (string-ascii 50))))
  (let
    (
      (new-id (+ (var-get last-scenario-id) u1))
    )
    (map-set paradox-scenarios
      { scenario-id: new-id }
      {
        creator: tx-sender,
        title: title,
        description: description,
        parameters: parameters,
        status: "open"
      }
    )
    (var-set last-scenario-id new-id)
    (ok new-id)
  )
)

(define-public (submit-resolution-attempt (scenario-id uint) (resolution-description (string-utf8 1000)))
  (let
    (
      (scenario (unwrap! (map-get? paradox-scenarios { scenario-id: scenario-id }) (err u404)))
    )
    (asserts! (is-eq (get status scenario) "open") (err u403))
    (ok (map-set paradox-scenarios
      { scenario-id: scenario-id }
      (merge scenario { status: "resolution-submitted" })
    ))
  )
)

(define-read-only (get-paradox-scenario (scenario-id uint))
  (ok (map-get? paradox-scenarios { scenario-id: scenario-id }))
)

