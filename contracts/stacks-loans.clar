(define-data-var stx-deposit uint u0)
(define-data-var lockup-period uint u0)
(define-data-var interest uint u0)
(define-data-var fee uint u5)

(define-public (get-stx-deposit (stx uint) (months uint))
    (ok
        (begin 
            (var-set stx-deposit stx)
            (var-set lockup-period months)
            (calculate-interest)
            (transfer-to-server)
            ;;(transfer-to-client)
            (pay-fee)
        )
    )
)

;;Calculation of interest based on 5% of stx-deposit times the lockup period
(define-private (calculate-interest)
    (ok
        (begin
            (var-set interest (* (/ (* (var-get stx-deposit) u5) u100) (var-get lockup-period)))
        )
    )
)

;;Transfers from client to server stx-deposit
(define-private (transfer-to-server)
  (begin
    ;;(print (unwrap-panic (stx-transfer? (var-get stx-deposit) tx-sender 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S)))
    (print (stx-transfer? (var-get stx-deposit) tx-sender 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S))
    (ok (var-get stx-deposit))
  )
)

;;Transfers from server to client interest stx
;;(define-private (transfer-to-client)
;;  (begin
;;    (print (stx-transfer? (var-get interest) 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S tx-sender))
;;    (ok (var-get interest))
;;  )
;;)

(define-private (pay-fee)
  (begin
    (print (stx-transfer? (var-get fee) tx-sender 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S))
    (ok (var-get fee))
  )
)